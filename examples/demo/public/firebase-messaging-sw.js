importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '148416985775',
});

self.addEventListener('notificationclick', function (event) {
    console.log({ eventeventeventevent: event });
});

const messaging = firebase.messaging();
