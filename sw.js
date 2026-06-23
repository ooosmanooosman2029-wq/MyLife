const CACHE_NAME = "mylife-v3";
const urlsToCache = ["./", "./index.html", "./manifest.json"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request).catch(() => caches.match("./"))));
});
