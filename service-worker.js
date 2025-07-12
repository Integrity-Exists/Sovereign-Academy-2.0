const CACHE_NAME = 'sovereign-academy-v2';
const urlsToCache = [
  '/index.html',
  '/about.html',
  '/remedies.html',
  '/ask-sage.html',
  '/dss.html',
  '/custody.html',
  '/ada-complaint.html',
  '/anthem.html',
  '/veterans.html',
  '/llc-guide.html',
  '/llc-to-trust.html',
  '/trust-conversion.html',
  '/arrested.html',
  '/style.css',
  '/smart-search.js',
  '/voice-search.js',
  '/manifest.json',
  '/icon-192-any.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png'
];

// ✅ INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('❌ Cache addAll failed:', err))
  );
});

// ✅ ACTIVATE & CLEAN OLD CACHE
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
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
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(err => {
        console.warn('Fetch failed; returning offline fallback:', err);
        return new Response('Offline');
      })
  );
});
