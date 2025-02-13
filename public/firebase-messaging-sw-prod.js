importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC7olMcoG9Jtfbf0KQtTCwkGpK5SdQ14PA",
  authDomain: "ir-prime-prod.firebaseapp.com",
  projectId: "ir-prime-prod",
  storageBucket: "ir-prime-prod.firebasestorage.app",
  messagingSenderId: "211907032789",
  appId: "1:211907032789:web:2e4f9ad6de512b7053945c",
  measurementId: "G-FQWEMD0KWH",
});

const messaging = firebase.messaging();

const broadcast = new BroadcastChannel("notification-channel");

messaging.onMessage(() => {
  broadcast.postMessage({
    type: "increase-count",
  });
});

messaging.onBackgroundMessage(() => {
  broadcast.postMessage({
    type: "increase-count",
  });
});
