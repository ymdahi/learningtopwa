const staticCacheName = 'site-static-v1.1';
const assets = [
    '/learningtopwa/',
    '/learningtopwa/index.html',
    '/learningtopwa/js/app.js',
    '/learningtopwa/js/ui.js',
    '/learningtopwa/js/materialize.min.js',
    '/learningtopwa/css/styles.css',
    '/learningtopwa/css/materialize.min.css',
    '/learningtopwa/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// install event
self.addEventListener('install', evt => {
    //console.log('sw installed');

    // cache assets
    // putting caching in the 'install' event allows
    // us to only update caches when sw.js changes

    // because the caching is asynchronous and the sw install
    // might not take that long, we wrap our caching in 
    // the waitUntil method:
    evt.waitUntil(
        // an asynchronous task that returns a promise:
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets')
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('sw activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);

    // check if asset being fetched exists in cache
    // if so, return cached asset instead of fetching
    evt.respondWith(
        // an async that returns a promise:
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request); // return cached response. if empty (||), fetch from server.
        })
    );

});