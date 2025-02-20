const CACHE_NAME = 'restaurant-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/pizza.jpg',
    '/images/burger.jpg',
    // أضف المزيد من المسارات إذا لزم الأمر
];

// تثبيت الـ Service Worker وتخزين الملفات في الـ Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// تخزين البيانات في الـ Cache عند التفاعل مع الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
