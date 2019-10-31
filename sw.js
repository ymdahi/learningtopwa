// install the service worker
self.addEventListener('install', evt => {
    console.log('sw installed');
});

// activate event
self.addEventListener('activate', evt => {
    console.log('sw activated');
});