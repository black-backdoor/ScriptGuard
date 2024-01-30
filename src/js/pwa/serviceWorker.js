const staticScriptGuard = "ScriptGuard-v0"
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
    //scaning
    "/js/scan/antifeature.js",
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
]

// service worker to cache the files
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticScriptGuard).then(cache => {
            cache.addAll(assets)
        })
    )
})

// service worker to fetch respond with cached files
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})


// register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}