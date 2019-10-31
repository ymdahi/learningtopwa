const staticCacheName = 'site-static';
const assets = [
    '/learningtopwa/',
    '/learningtopwa/index.html',
    '/learningtopwa/js/app.js',
    '/learningtopwa/js/ui.js',
    '/learningtopwa/js/materialize.min.js',
    '/learningtopwa/css/styles.css',
    '/learningtopwa/css/materialize.min.css',
    '/learningtopwa/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// install event
self.addEventListener('install', evt => {
    //console.log('sw installed');

    // cache assets
    // putting cacheing in the 'install' event allows
    // us to only update caches when sw.js changes

    // because the cacheing is asynchronous and the sw install
    // might not take that long, we wrap our cacheing in 
    // the waitUntil method:
    evt.waitUntil(
        // an asynchronous task that returns a promise:
        caches.open(staticCacheName).then(cache => {
            console.log('cacheing shell assets')
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('sw activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);

});