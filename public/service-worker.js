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

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keyList) => {
          return Promise.all(
              keyList.map(key => {
                  if (key !== CACHE_NAME && key !== DATA_CACHE_NAME){
                      console.log("Removing old cache", key);
                      return caches.delete(key)
                  }
              })
          )
        })
    );
    self.clients.claim()

  });

// fetch
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches
        .open(DATA_CACHE_NAME)
        .then(cache => {
            return fetch(event.request)
            .then(response => {
                if(response.status === 200){
                    cache.put(event.request.url, response.clone())
                }
                return response;
            }).catch(err => {
                return cache.match(event.request)
            })
        }).catch(err => console.log(err))
        )
    } else {
        event.respondWith(
            caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request)
                })
            })
        )
    }
})
    
    

    
          