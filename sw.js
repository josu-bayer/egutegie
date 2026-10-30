var CACHE_NAME = "egutegie-v1";
var APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];
var SDK_PREFIX = "https://www.gstatic.com/firebasejs/";

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(
        names.filter(function(name){ return name !== CACHE_NAME; })
             .map(function(name){ return caches.delete(name); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

// Network-first for the app shell. The Firebase SDK modules (gstatic) get the same
// treatment so a cold start with no connectivity can still import them. Firestore and
// every other cross-origin request is left alone.
self.addEventListener("fetch", function(event){
  var req = event.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var sdk = req.url.indexOf(SDK_PREFIX) === 0;
  if (!sameOrigin && !sdk) return;

  event.respondWith(
    fetch(req).then(function(res){
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(cached){
        if (cached) return cached;
        return sameOrigin ? caches.match("./index.html") : Response.error();
      });
    })
  );
});
