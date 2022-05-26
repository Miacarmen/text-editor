const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { StaleWhileRevalidate } = require("workbox-strategies");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// takes an array of URLs to precache
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  // name of cache storage
  cacheName: "page-cache",
  plugins: [
    // caches responses with these headers for max 30 days
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// TO-DO: offline fallback
offlineFallback({});

// load provided urls into cache during SW's install, caching them with the options of the provided strategy
// alternative to precaching
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Implement asset caching
registerRoute(
  // callback that filters the requests to cache
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    // name of cache storage
    cacheName: "asset-cache",
    plugins: [
      // caches responses with these headers for max 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
