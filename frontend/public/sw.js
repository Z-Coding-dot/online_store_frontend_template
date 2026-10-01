/* global self, caches, fetch */
const CACHE_NAME = 'arden-house-v1'
const APP_SHELL = ['/', '/manifest.webmanifest']
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))))
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone()
    void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
    return response
  }).catch(() => caches.match('/'))))
})
