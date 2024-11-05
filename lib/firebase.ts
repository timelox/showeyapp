import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAK_oePNvW3oL-RU_J4jRtU9IrMDCN7Cis",
  authDomain: "showey-60917.firebaseapp.com",
  projectId: "showey-60917",
  storageBucket: "showey-60917.firebasestorage.app",
  messagingSenderId: "849092034007",
  appId: "1:849092034007:web:d41e49b77d3daf92211f92",
  measurementId: "G-JHS3X12D49"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };