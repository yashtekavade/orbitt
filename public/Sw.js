/* Orbit service worker — minimal & safe.
   It ONLY caches our own static shell for offline open.
   It NEVER touches: non-GET requests, cross-origin (Firebase, CDNs,
   map tiles, avatars). This makes it impossible to break live data. */

const CACHE = 'orbit-shell-v2';
const SHELL = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const req = e.request;

    // Hard guards — bail out (let the browser handle it normally) for anything
    // that isn't a simple GET to our own origin.
    if (req.method !== 'GET') return;                       // never cache POST/PUT (Firebase writes)
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;        // never touch Firebase/CDN/tiles/avatars

    e.respondWith(
        fetch(req)
            .then(res => {
                // only cache successful, cacheable GET responses
                if (res && res.status === 200 && res.type === 'basic') {
                    const copy = res.clone();
                    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
                }
                return res;
            })
            .catch(() => caches.match(req))
    );
});


