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

messaging.onMessage((data) => {
  console.log("notification received", data);
  broadcast.postMessage({
    type: "increase-count",
  });
});

messaging.onBackgroundMessage((data) => {
  console.log("notification received bg", data);
  broadcast.postMessage({
    type: "increase-count",
  });
});
