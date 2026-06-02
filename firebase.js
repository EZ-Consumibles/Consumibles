import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVoPp-Mc6dP1V7vc_UM09eGwusyR47p5A",
  authDomain: "consumiblesez.firebaseapp.com",
  projectId: "consumiblesez",
  storageBucket: "consumiblesez.firebasestorage.app",
  messagingSenderId: "964989535539",
  appId: "1:964989535539:web:6bdfe7cb0604c9f9496a46",
  measurementId: "G-YDGNZ6K0KS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
};
