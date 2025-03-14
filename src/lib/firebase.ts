import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHmnCic80J-TbKiMtCSX-F0NYKValaMOs",
  authDomain: "runiverse-dd2b8.firebaseapp.com",
  projectId: "runiverse-dd2b8",
  storageBucket: "runiverse-dd2b8.firebasestorage.app",
  messagingSenderId: "675631277641",
  appId: "1:675631277641:web:d7f3d412849ae5e9ee0198",
  measurementId: "G-R4S93LLQ0T",
};
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("firebase app initialized", app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default app;
