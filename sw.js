const C='nafsnegar-v1',A=['./','index.html','manifest.webmanifest','logo.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
e.respondWith(caches.match(r).then(h=>{const f=fetch(r).then(res=>{if(res&&res.ok&&(res.type==='basic'||/fonts\.(googleapis|gstatic)\.com/.test(r.url)))caches.open(C).then(c=>c.put(r,res.clone()));return res}).catch(()=>h);return h||f}))});
