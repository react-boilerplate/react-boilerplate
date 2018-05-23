/* eslint-disable */
const cacheName = 'richard-bernstein';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/bundle.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        const responseClone = response.clone();
        caches.open(cacheName)
          .then((cache) => {
            if (request.method !== 'PUT') cache.put(event.request, responseClone);
          })
          .catch(console.error);
        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then((resp) => {
            return resp || caches.match('/index.html');
          })
      })
      .catch(function () {
        return caches.match('/index.html');
      })
    );
});