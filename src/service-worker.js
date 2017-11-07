var CACHE_NAME = 'webstart-v1';
var urlsToCache = ['/', '/css/bundle.css', '/js/bundle.js'];

// Install a service worker
self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
		return cache.addAll(urlsToCache);
	}));
});

// Cache and return requests
self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		if (response) {
			return response;
		}
		return fetch(event.request);
	}));
});
