self.addEventListener("install", (event) => {
    console.log("Service Worker: Installed");

    event.waitUntil(
        caches.open("app-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/bundle.js",
                "/mini.css",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log("📡 Service Worker: Fetching");

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
