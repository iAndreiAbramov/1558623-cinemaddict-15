const CACHE_PREFIX = 'cinemadict-cache';
const CACHE_VERSION = 'v15';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const RESPONSE_SAFE_TYPE = 'basic';

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        '/',
        './index.html',
        './bundle.js',
        './css/main.css',
        './css/normalize.css',
        './fonts/OpenSans-Bold.woff2',
        './fonts/OpenSans-ExtraBold.woff2',
        './fonts/OpenSans-Regular.woff2',
        './images/spinner-1s-200px.gif',
        './images/background.png',
        './images/bitmap.png',
        './images/bitmap@2x.png',
        './images/bitmap@3x.png',
        './images/emoji/angry.png',
        './images/emoji/smile.png',
        './images/emoji/puke.png',
        './images/emoji/sleeping.png',
        './images/icons',
        './images/posters',
      ])),
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => {
          if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
            return caches.delete(key);
          }

          return null;
        })
          .filter((key) => key !== null),
      )),
  );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(request)
          .then((response) => {
            if (!response || !response.ok || response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }

            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clonedResponse));

            return response;
          });
      }),
  );
};

self.addEventListener('fetch', handleFetch);
