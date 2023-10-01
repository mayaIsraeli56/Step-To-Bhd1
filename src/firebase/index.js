// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9FlaFckMA_iUVn8DIcPsP6wZ03fj2OI0",
  authDomain: "ionic-start4.firebaseapp.com",
  projectId: "ionic-start4",
  storageBucket: "ionic-start4.appspot.com",
  messagingSenderId: "789633652930",
  appId: "1:789633652930:web:1fc94e77680e15f642435b",
  measurementId: "G-DHS99QFPPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
