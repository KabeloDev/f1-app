import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "f1-app-3f81d.firebaseapp.com",
  projectId: "f1-app-3f81d",
  storageBucket: "f1-app-3f81d.firebasestorage.app",
  messagingSenderId: "636922334610",
  appId: "1:636922334610:web:0bf8635adeb7051d41854b",
  measurementId: "G-6VSTSJ6NJ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);