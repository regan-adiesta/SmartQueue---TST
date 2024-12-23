import { initializeApp } from "firebase/app";
import fs from 'fs';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import admin from 'firebase-admin';

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArdToR5C51gLMQQOqSvsxIJX4ZOhAGC4I",
  authDomain: "tst-queue.firebaseapp.com",
  projectId: "tst-queue",
  storageBucket: "tst-queue.firebasestorage.app",
  messagingSenderId: "679118510002",
  appId: "1:679118510002:web:8b6dfee58005840c3cf6ab",
  measurementId: "G-1T0MKDTREK"
};

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

const db = admin.firestore(); // Inisialisasi Firestore
export default db;