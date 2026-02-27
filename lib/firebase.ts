import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAepOfT90Hcn0Z4QzzqBnNLz5CtHd5gkiE",
  authDomain: "funny-heist-app.firebaseapp.com",
  projectId: "funny-heist-app",
  storageBucket: "funny-heist-app.firebasestorage.app",
  messagingSenderId: "883173538808",
  appId: "1:883173538808:web:b34484d4630a0091fff40d",
};

// Initialize Firebase (singleton pattern)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
