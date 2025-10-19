// Service Worker for offline font caching
const CACHE_NAME = 'portfolio-fonts-v1';
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
];

// Install event - cache fonts
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          FONT_URLS.map(url => 
            cache.add(url).catch(err => {
              console.warn(`Failed to cache font: ${url}`, err);
              return null;
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve fonts from cache when online fails
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('fonts.googleapis.com')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
        .then((response) => {
          if (response) {
            return response;
          }
          // If not in cache either, return a minimal CSS fallback
          return new Response(
            `/* Font fallback - network and cache failed */
             @font-face { 
               font-family: 'Geist'; 
               src: local('system-ui'), local('Arial'); 
               font-display: swap; 
             }`,
            {
              headers: {
                'Content-Type': 'text/css',
                'Cache-Control': 'public, max-age=31536000'
              }
            }
          );
        })
    );
  }
});