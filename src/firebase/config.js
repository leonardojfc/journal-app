// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADSEKIaPQ5PhqBkZv_n9aMAHPG2lEDGtU",
  authDomain: "react-app-42f53.firebaseapp.com",
  projectId: "react-app-42f53",
  storageBucket: "react-app-42f53.appspot.com",
  messagingSenderId: "68541896582",
  appId: "1:68541896582:web:f7a01a0dd31c76071afe07"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );