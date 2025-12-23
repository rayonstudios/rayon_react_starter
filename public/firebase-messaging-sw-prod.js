importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDY_yldPr0P8kZyETMcDXKkcV0GINLta-Y",
  authDomain: "rayon-gcp-starter.firebaseapp.com",
  projectId: "rayon-gcp-starter",
  storageBucket: "rayon-gcp-starter.firebasestorage.app",
  messagingSenderId: "227506371134",
  appId: "1:227506371134:web:c58e2b9e54cc1072326f6f",
  measurementId: "G-GQGDRNM8RJ",
});
const messaging = firebase.messaging();

const broadcast = new BroadcastChannel("notification-channel");

// Handle background messages (when app is not in focus)
messaging.onBackgroundMessage((payload) => {
  console.log("notification received bg", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "/favicon.ico",
    badge: "/favicon.ico",
    data: payload.data,
  };

  // Show browser notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Broadcast to app
  broadcast.postMessage({
    type: "notification-received",
    payload: {
      title: notificationTitle,
      body: notificationOptions.body,
      data: payload.data,
    },
  });
});

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
