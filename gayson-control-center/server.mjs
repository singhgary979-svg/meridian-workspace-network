import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
const html = await readFile(new URL("./index.html", import.meta.url));
const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";
createServer((req, res) => {
  const pathname = new URL(req.url || "/", "http://localhost").pathname;
  const common = {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { ...common, Allow: "GET, HEAD" }); res.end(); return;
  }
  if (pathname === "/healthz") {
    const payload = JSON.stringify({ ok: true, app: "gayson-industries", nativeSitesSync: "unavailable" });
    res.writeHead(200, { ...common, "Content-Type": "application/json; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : payload); return;
  }
  if (pathname === "/" || pathname === "/index.html") {
    res.writeHead(200, { ...common, "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : html); return;
  }
  if (pathname === "/robots.txt") {
    res.writeHead(200, { ...common, "Content-Type": "text/plain; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : "User-agent: *\nDisallow: /\n"); return;
  }
  res.writeHead(404, { ...common, "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}).listen(port, host, () => process.stdout.write("GAYSON control center listening on " + port + "\n"));
