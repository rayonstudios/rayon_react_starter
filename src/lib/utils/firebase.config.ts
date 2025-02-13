// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import { isDev } from "./misc.utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = isDev()
  ? {
      apiKey: "AIzaSyCRU-zYW7O-YKcXRk1Sq5PO6zTknux8DuI",
      authDomain: "omega-episode-437415-r5.firebaseapp.com",
      projectId: "omega-episode-437415-r5",
      storageBucket: "omega-episode-437415-r5.firebasestorage.app",
      messagingSenderId: "979934890224",
      appId: "1:979934890224:web:75122e9f216a1fed961a35",
      measurementId: "G-D5MXKD8SVG",
    }
  : {
      apiKey: "AIzaSyC7olMcoG9Jtfbf0KQtTCwkGpK5SdQ14PA",
      authDomain: "ir-prime-prod.firebaseapp.com",
      projectId: "ir-prime-prod",
      storageBucket: "ir-prime-prod.firebasestorage.app",
      messagingSenderId: "211907032789",
      appId: "1:211907032789:web:2e4f9ad6de512b7053945c",
      measurementId: "G-FQWEMD0KWH",
    };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging(app);
