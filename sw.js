const CACHE_PREFIX = 'cinemadict-cache';
const CACHE_VERSION = 'v15';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const RESPONSE_SAFE_TYPE = 'basic';

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        './tree/build/',
        './tree/build/index.html',
        './tree/build/bundle.js',
        './tree/build/css/main.css',
        './tree/build/css/normalize.css',
        './tree/build/fonts/OpenSans-Bold.woff2',
        './tree/build/fonts/OpenSans-ExtraBold.woff2',
        './tree/build/fonts/OpenSans-Regular.woff2',
        './tree/build/images/background.png',
        './tree/build/images/bitmap.png',
        './tree/build/images/bitmap@2x.png',
        './tree/build/images/bitmap@3x.png',
        './tree/build/images/emoji/angry.png',
        './tree/build/images/emoji/smile.png',
        './tree/build/images/emoji/puke.png',
        './tree/build/images/emoji/sleeping.png',
        './tree/build/images/icons/icon-favorite-active.svg',
        './tree/build/images/icons/icon-favorite.svg',
        './tree/build/images/icons/icon-watched-active.svg',
        './tree/build/images/icons/icon-watched.svg',
        './tree/build/images/icons/icon-watchlist-active.svg',
        './tree/build/images/icons/icon-watchlist.svg',
        './tree/build/images/posters/made-for-each-other.png',
        './tree/build/images/posters/popeye-meets-sinbad.png',
        './tree/build/images/posters/sagebrush-trail.jpg',
        './tree/build/images/posters/santa-claus-conquers-the-martians.jpg',
        './tree/build/images/posters/the-dance-of-life.jpg',
        './tree/build/images/posters/the-great-flamarion.jpg',
        './tree/build/images/posters/the-man-with-the-golden-arm.jpg',
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
