const CACHE_NAME = 'sovereign-academy-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/download-responsive.css',
  '/smart-search.js',
  '/voice-search.js',
  '/manifest.json',
  '/icons/icon-192-any.png',
  '/icons/icon-512-any.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-512-maskable.png'
];

// Install and cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
