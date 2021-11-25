// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, getDocs, doc, setDoc, addDoc, Timestamp, query, orderBy } from 'firebase/firestore/';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYJDfULqbFv6QVpqjue2Fjh7OgqY5nUA",
  authDomain: "linkedin-clone-56bea.firebaseapp.com",
  projectId: "linkedin-clone-56bea",
  storageBucket: "linkedin-clone-56bea.appspot.com",
  messagingSenderId: "306660710948",
  appId: "1:306660710948:web:f2b0bc58df6574858096b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth, collection, getDocs, onSnapshot, doc, setDoc, addDoc, Timestamp, query, orderBy, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword }