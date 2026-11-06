import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

const root = (process.env.MERIDIAN_PAGES_URL || "https://singhgary979-svg.github.io/meridian-workspace-network/").replace(/\/?$/, "/");
const routes = [
  ["GAYSON", "", "GAYSON Industries"],
  ["Nano Voice Lab", "nano-voice-lab/", "Meridian OS · Nano Voice Lab"],
  ["Deployment Control Room", "deployment-control-room/", "GAYSON | Meridian Deployment Control Room"],
  ["Callback Committee", "callback-committee/", "The Callback Committee"],
  ["Gary Knows Stats", "gary-knows-stats/", "Gary Knows Stats"]
];
const failures=[], results=[];
function check(ok,label){console.log((ok?"PASS":"FAIL")+": "+label);if(!ok)failures.push(label);}
const browser=await chromium.launch({headless:true});
for(const mobile of [false,true]){
  const profile=mobile?"mobile":"desktop";
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:800},isMobile:mobile,hasTouch:mobile,acceptDownloads:true});
  for(const [name,path,title] of routes){
    const page=await context.newPage(),errors=[];
    page.on("pageerror",e=>errors.push(e.message));
    try{
      const response=await page.goto(new URL(path,root).href,{waitUntil:"domcontentloaded",timeout:30000});
      await page.waitForTimeout(500);
      const code=response?response.status():0, actual=await page.title();
      const body=await page.locator("body").innerText();
      const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
      check(code===200,name+" "+profile+" HTTP "+code);
      check(actual.includes(title),name+" "+profile+" title "+actual);
      check(body.trim().length>100,name+" "+profile+" rendered body");
      check(widths.scroll<=widths.client+18,name+" "+profile+" no page-level horizontal overflow "+JSON.stringify(widths));
      check(errors.length===0,name+" "+profile+" no uncaught script errors "+errors.join(" | "));
      results.push({name,profile,code,title:actual,widths,errors});
      if(mobile && path==="deployment-control-room/"){
        await page.locator('button[data-tab="checkpoints"]').click();
        await page.locator("#checkpointName").fill("CI-MOBILE-SMOKE-TEST");
        await page.locator("#saveCheckpoint").click();
        check((await page.locator("#checkpointList").innerText()).includes("CI-MOBILE-SMOKE-TEST"),"control room named checkpoint");
        await page.reload({waitUntil:"domcontentloaded"});
        await page.locator('button[data-tab="checkpoints"]').click();
        check((await page.locator("#checkpointList").innerText()).includes("CI-MOBILE-SMOKE-TEST"),"control room local persistence");
        await page.locator('button[data-tab="backup"]').click();
        const downloading=page.waitForEvent("download",{timeout:10000});
        await page.locator("#exportJson").click();
        const downloaded=await downloading;
        const backup=JSON.parse(await readFile(await downloaded.path(),"utf8"));
        check(backup.schema==="meridian-gayson-deployment-control-room/1.0","control room exported valid JSON schema");
        page.on("dialog",d=>d.accept());
        await page.locator("#importFile").setInputFiles({name:"test-backup.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(backup))});
        await page.waitForTimeout(350);
        await page.locator('button[data-tab="checkpoints"]').click();
        check((await page.locator("#checkpointList").innerText()).includes("CI-MOBILE-SMOKE-TEST"),"control room JSON import");
      }
      if(mobile && path==="nano-voice-lab/"){
        check((await page.locator("#generationGate").count())===1,"Nano generation gate present; no model inference asserted");
      }
      if(mobile && path==="callback-committee/"){
        await page.getByRole("button",{name:"Checkpoints"}).first().click();
        check(await page.locator("#checkpointName").isVisible(),"Callback Committee checkpoint view interactive");
      }
      if(mobile && path==="gary-knows-stats/"){
        check((await page.locator("#calcOut").count())===1,"Gary Knows Stats calculator present");
      }
    }catch(e){check(false,name+" "+profile+" interactive test: "+e.message)}
    finally{await page.close()}
  }
  await context.close()
}
await browser.close();
console.log("RESULTS_JSON "+JSON.stringify({root,results,failures}));
if(failures.length)process.exitCode=1;
