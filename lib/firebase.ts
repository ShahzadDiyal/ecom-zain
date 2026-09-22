import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJo5IG7epfn9sxO-ElPKY7Fqch9n4DgTA",
  authDomain: "ecom-zain.firebaseapp.com",
  projectId: "ecom-zain",
  storageBucket: "ecom-zain.firebasestorage.app",
  messagingSenderId: "264171918248",
  appId: "1:264171918248:web:ce4215349e589c016a839d",
  measurementId: "G-PRYEPE5FFV"
};

// Initialize Firebase App (prevent re-initializing on hot reloads)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics wrapper safe for SSR
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
