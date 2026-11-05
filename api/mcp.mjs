import { route } from "../src/router.mjs";
import { validateRegistry } from "../src/master.mjs";
import registry from "../registry/plugins.json" with { type: "json" };
import { timingSafeEqual } from "node:crypto";

const PROTOCOL = "2025-03-26";
const tools = [
  { name: "meridian_list_workspaces", description: "List registered workspace identifiers. Registration is not runtime connectivity.", inputSchema: {type:"object",properties:{},additionalProperties:false} },
  { name: "meridian_route", description: "Select a registered workspace by intent without invoking it.", inputSchema: {type:"object",properties:{request:{type:"string"},explicitTarget:{type:"string"}},required:["request"],additionalProperties:false} }
];
const send = (res, status, body) => res.status(status).setHeader("Content-Type","application/json").send(body);
function allowed(req) {
  const secret = process.env.MCP_ACCESS_TOKEN;
  if (!secret || secret.length < 32) return false;
  const supplied = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(supplied), b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a,b);
}
export default function handler(req,res) {
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  if(req.method==="GET") return send(res,200,{service:"meridian-mcp",ready:Boolean(process.env.MCP_ACCESS_TOKEN && process.env.MCP_ACCESS_TOKEN.length>=32),state:"stateless",pluginInvocation:false});
  if(req.method!=="POST") return send(res,405,{error:"Method not allowed"});
  if(!process.env.MCP_ACCESS_TOKEN || process.env.MCP_ACCESS_TOKEN.length<32) return send(res,503,{error:"Authentication not configured"});
  if(!allowed(req)) return send(res,401,{error:"Unauthorized"});
  const body=req.body;
  if(!body || typeof body!=="object" || Array.isArray(body)) return send(res,400,{error:"Invalid JSON-RPC body"});
  if(body.jsonrpc!=="2.0") return send(res,400,{error:"Invalid JSON-RPC version"});
  if(body.method==="notifications/initialized") return res.status(202).end();
  const id=body.id;
  if(id===undefined || id===null) return send(res,400,{error:"Request ID required"});
  const ok=result=>send(res,200,{jsonrpc:"2.0",id,result});
  const err=(code,message)=>send(res,200,{jsonrpc:"2.0",id,error:{code,message}});
  try {
    validateRegistry(registry);
    switch(body.method) {
      case "initialize": return ok({protocolVersion:PROTOCOL,capabilities:{tools:{listChanged:false}},serverInfo:{name:"meridian-network",version:"0.1.0"}});
      case "ping": return ok({});
      case "tools/list": return ok({tools});
      case "tools/call": {
        const name=body.params?.name, args=body.params?.arguments ?? {};
        if(name==="meridian_list_workspaces") return ok({content:[{type:"text",text:JSON.stringify(registry.entries.map(({key,role,status})=>({key,role,status})))}]});
        if(name==="meridian_route") {
          if(typeof args.request!=="string") return err(-32602,"request must be a string");
          const result=route(args.request,registry.entries,{explicitTarget:args.explicitTarget??null});
          return ok({content:[{type:"text",text:JSON.stringify(result)}]});
        }
        return err(-32601,"Unknown tool");
      }
      default: return err(-32601,"Method not found");
    }
  } catch { return err(-32603,"Internal error"); }
}
