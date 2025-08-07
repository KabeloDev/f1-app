// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_API_KEY,
  authDomain: "f1-app-3f81d.firebaseapp.com",
  projectId: "f1-app-3f81d",
  storageBucket: "f1-app-3f81d.firebasestorage.app",
  messagingSenderId: "636922334610",
  appId: "1:636922334610:web:0bf8635adeb7051d41854b",
  measurementId: "G-6VSTSJ6NJ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});