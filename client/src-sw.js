const { offlineFallback, warmStrategyCache } = require('workbox-recipes');

const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// takes an array of URLs to precache
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  // name of cache storage
  cacheName: 'page-cache',
  plugins: [
    // cache responses with these headers 
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// callback that filters the requests to cache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TO DO: implement asset cahcing
registerRoute(
  
);
