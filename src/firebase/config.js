// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyADSEKIaPQ5PhqBkZv_n9aMAHPG2lEDGtU",
//   authDomain: "react-app-42f53.firebaseapp.com",
//   projectId: "react-app-42f53",
//   storageBucket: "react-app-42f53.appspot.com",
//   messagingSenderId: "68541896582",
//   appId: "1:68541896582:web:f7a01a0dd31c76071afe07"
// };

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyB3UM30FSm2brsJ_j-MpnDiTobdDhBconU",
//   authDomain: "test-data-26a17.firebaseapp.com",
//   projectId: "test-data-26a17",
//   storageBucket: "test-data-26a17.appspot.com",
//   messagingSenderId: "502514783475",
//   appId: "1:502514783475:web:7477341b23f30ed7711386"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );