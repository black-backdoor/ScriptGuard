const staticScriptGuard = "ScriptGuard-v1"
const assets = [
  // --- Webpages ---
  "/",
  "/index.html",
  "/style.css",
  "/scan/",
  "/scan/index.html",
  "/scan/style.css",
  // --- JavaScript ---
  "/js/code-popup.js",
  "/js/upload.js",
  //scanning
  "/js/scan/antifeatures.js",
  "/js/scan/cookies.js",
  "/js/scan/metainfo.js",
  "/js/scan/scanner.js",
  // --- Data ---
  "/data/antifeatures.json",
  "/data/grant.json",
  // --- Images ---
  "/assets/favicon.svg",
  "/assets/logo.svg",
  // Icons
  "/assets/icons/code.svg",
  "/assets/icons/info.svg",
  "/assets/icons/close.svg",
  // --- PWA ---
  "/manifest.json",
  "/js/pwa/serviceWorker.js",
  "/js/pwa/registerPWAWorker.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticScriptGuard).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});