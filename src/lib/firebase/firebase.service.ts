import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import { isDev, isProd } from "../utils/misc.utils";

// Determine database ID based on environment
const databaseId = isProd()
  ? "starter-prod"
  : isDev()
    ? "starter-dev"
    : "starter-test";

const projectConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rayon-gcp-starter.firebaseapp.com",
  projectId: "rayon-gcp-starter",
  storageBucket: isProd()
    ? "rayon-gcp-starter"
    : isDev()
      ? "rayon-gcp-starter-dev"
      : "rayon-gcp-starter-test",
  messagingSenderId: "227506371134",
  appId: "1:227506371134:web:c58e2b9e54cc1072326f6f",
  measurementId: "G-GQGDRNM8RJ",
};

const app = initializeApp(projectConfig);

// Initialize Firestore with environment-specific database ID
const db = getFirestore(app, databaseId);

const auth = getAuth(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export const firebase = {
  db,
  auth,
  storage,
  messaging,
  isEnabled: import.meta.env.VITE_FIREBASE_AUTH_ENABLED === "true",
};

export const getFirebaseEmail = (email: string) => {
  const [prefix, domain] = email.split("@");
  return `${prefix}+${import.meta.env.VITE_ENV || "dev"}@${domain}`;
};
