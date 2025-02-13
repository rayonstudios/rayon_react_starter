importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCRU-zYW7O-YKcXRk1Sq5PO6zTknux8DuI",
  authDomain: "omega-episode-437415-r5.firebaseapp.com",
  projectId: "omega-episode-437415-r5",
  storageBucket: "omega-episode-437415-r5.firebasestorage.app",
  messagingSenderId: "979934890224",
  appId: "1:979934890224:web:75122e9f216a1fed961a35",
  measurementId: "G-D5MXKD8SVG",
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
