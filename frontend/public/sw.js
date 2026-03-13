// frontend/public/sw.js — Service Worker JOJ 2026
const CACHE_NAME = 'joj-2026-v1'

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/lion.png',
  '/manifest.json',
]

// ── INSTALL : mise en cache des assets statiques ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 JOJ PWA: mise en cache des assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// ── ACTIVATE : nettoyage des vieux caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

// ── FETCH : stratégie Network First avec fallback cache ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  // API calls → Network only (pas de cache pour les réponses du bot)
  if (url.pathname.startsWith('/api') || url.hostname.includes('openai')) {
    return
  }

  // Assets statiques → Cache First
  if (
    event.request.destination === 'image' ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
          return response
        })
      })
    )
    return
  }

  // HTML + JS + CSS → Network First, fallback cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        return response
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached
          // Fallback ultime : page d'accueil depuis le cache
          if (event.request.destination === 'document') {
            return caches.match('/')
          }
        })
      })
  )
})

// ── PUSH NOTIFICATIONS (futur) ──
self.addEventListener('push', event => {
  if (!event.data) return
  const data = event.data.json()
  self.registration.showNotification(data.title || 'JOJ 2026', {
    body: data.body || '',
    icon: '/lion.png',
    badge: '/lion.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' }
  })
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})