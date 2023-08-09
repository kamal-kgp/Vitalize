// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLWeH2Tw_eb27jCA9e2OZqFIBEq-NPqlM",  
  authDomain: "fitconnect-kgp.firebaseapp.com",                
  projectId: "fitconnect-kgp",            
  storageBucket: "fitconnect-kgp.appspot.com",
  messagingSenderId: "949830678886",
  appId: "1:949830678886:web:9ee8fb6fa8b574d5a230a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);    
export const auth = getAuth(app);  