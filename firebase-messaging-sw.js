importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBHlPiVLpuDIct-iKYEfJ6a5L9nH1P6Tf4",
  authDomain: "kazananapp-8e1ed.firebaseapp.com",
  projectId: "kazananapp-8e1ed",
  storageBucket: "kazananapp-8e1ed.appspot.com",
  messagingSenderId: "717843836467",
  appId: "1:717843836467:web:043c11376042dac16dfd46",
  measurementId: "G-Z6FYQBVDBT"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("📦 Arka planda bildirim:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://kazananapp.com/icon.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});