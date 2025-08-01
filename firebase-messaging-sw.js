importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBVRuKaod50BvdaKP2tr516NBD9-p6JtXc",
  authDomain: "kazananapp.firebaseapp.com",
  projectId: "kazananapp",
  messagingSenderId: "181140671000",
  appId: "1:181140671000:web:4a446b0aea93bda061d16d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'static/images/favicon.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});