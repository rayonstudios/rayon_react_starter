importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "fake",
  authDomain: "fake",
  projectId: "fake",
  storageBucket: "fake",
  messagingSenderId: "fake",
  appId: "fake",
  measurementId: "fake",
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
