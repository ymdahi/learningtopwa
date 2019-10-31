// install event
self.addEventListener('install', evt => {
    console.log('sw installed');
});

// activate event
self.addEventListener('activate', evt => {
    console.log('sw activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
});