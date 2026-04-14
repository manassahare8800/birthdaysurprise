const CACHE_NAME = "puja-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./music.mp3",

  "./phataka1.jpeg",
  "./phataka2.jpeg",
  "./phataka3.jpeg",
  "./phataka4.jpeg",
  "./phataka5.jpeg",
  "./phataka6.jpeg",
  "./phataka7.jpeg",
  "./phataka8.jpeg"
];

// install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// fetch (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// update cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});