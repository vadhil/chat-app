// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPZlvPUjvae5rSHtmJe7HxEAYKSqHXajY",
  authDomain: "super-chat-app-ebc1f.firebaseapp.com",
  projectId: "super-chat-app-ebc1f",
  storageBucket: "super-chat-app-ebc1f.appspot.com",
  messagingSenderId: "1009239528801",
  appId: "1:1009239528801:web:a824facf9b4e1e4b42e120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
