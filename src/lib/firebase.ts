import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHmnCic80J-TbKiMtCSX-F0NYKValaMOs",
  authDomain: "runiverse-dd2b8.firebaseapp.com",
  projectId: "runiverse-dd2b8",
  storageBucket: "runiverse-dd2b8.firebasestorage.app",
  messagingSenderId: "675631277641",
  appId: "1:675631277641:web:d7f3d412849ae5e9ee0198",
  measurementId: "G-R4S93LLQ0T",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
