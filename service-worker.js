const CACHE_NAME = 'sovereign-academy-v2';
const urlsToCache = [
  '/index.html',
  '/about.html',
  '/remedies.html',
  '/ask-sage.html',
  '/dss.html',
  '/custody.html',
  '/ada.html',
  '/anthem.html',
  '/veterans.html',
  '/llc-guide.html',
  '/llc-to-trust.html',
  '/css/style.css',
  '/css/download-responsive.css',
  '/js/smart-search.js',
  '/js/voice-search.js',
  '/manifest.json',
  '/icons/icon-192-any.png',
  '/icons/icon-512-any.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-512-maskable.png'
];

// ✅ INSTALL
self.addEventListener('install', event => {
  self.skipWaiting(); // 👈 Instantly activate new SW
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ✅ ACTIVATE & CLEANUP
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

// ✅ FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
