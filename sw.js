const staticCacheName = 'site-static-v1.1';
const dynamicCacheName = 'site-dynamic-v1.0';
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

    // use waitUntil method to wait for promise before moving on
    evt.waitUntil(
        // the waitUntil method waits for this promis to return
        caches.keys().then(keys => {
            // return a single promise
            return Promise.all(keys
                .filter(key => key !== staticCacheName) // create a new array that includes all staticCacheName that are not === to the current one.
                .map(key => caches.delete(key)) // delete all keys that from that array of unmatching cache names.
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
            // return cached response if available, otherwise fetch and cache dynamically from server.
            return cacheRes || fetch(evt.request).then(fetchRes => {
                // put/cache dynamic resources in dynamicCacheName
                return caches.open(dynamicCacheName).then(cache => {
                    // use a clone of fetchRes so that we can return the original in our promise (key and value)
                    cache.put(evt.request.url, fetchRes.clone());
                    // still return the response for the user
                    return fetchRes;
                })
            });
        })
    );

});