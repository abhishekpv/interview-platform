// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6PaXqabIKWFTIJc50XSINP-w5BoMzG_Y",
  authDomain: "intervox-7f878.firebaseapp.com",
  projectId: "intervox-7f878",
  storageBucket: "intervox-7f878.firebasestorage.app",
  messagingSenderId: "246559757010",
  appId: "1:246559757010:web:039e4f9e206588a604130b",
  measurementId: "G-CYBCYHKYPR",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
