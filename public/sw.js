/* Cleanup worker for stale localhost/GitHub Pages service-worker registrations. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.registration.unregister());
});
