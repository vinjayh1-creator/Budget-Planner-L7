const C="budget-planner-v7";
const FILES=["./","index.html","manifest.json","lucide.min.js","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon-180.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith("budget-planner-")&&n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put("index.html",res.clone()));return res}).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})))});
