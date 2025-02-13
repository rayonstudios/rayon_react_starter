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
      apiKey: "fake",
      authDomain: "fake",
      projectId: "fake",
      storageBucket: "fake",
      messagingSenderId: "fake",
      appId: "fake",
      measurementId: "fake",
    }
  : {
      apiKey: "fake",
      authDomain: "fake",
      projectId: "fake",
      storageBucket: "fake",
      messagingSenderId: "fake",
      appId: "fake",
      measurementId: "fake",
    };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging(app);
