const CACHE_NAME = "static-cache-v3";
const DATA_CACHE_NAME = "data-cache-v2";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/styles.css",
  "/db.js",
  "/index.js",
  "/icons/icon-512x512.png",
  "/icons/icon-192x192.png"
];

// install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>{
          console.log("Your files were pre-cached successfully");
          return cache.addAll(FILES_TO_CACHE)
      })
  );
  self.skipWaiting()
});
