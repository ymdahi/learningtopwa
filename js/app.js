if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/learningtopwa/sw.js')
        .then((reg) => console.log('sw registered', reg))
        .catch((err) => console.log('sw rejected', err));
}