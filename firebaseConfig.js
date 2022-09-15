// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaiwgYeV1mlYWjfkLscUsQ_K8nAiC9ims",
  authDomain: "better-than-you-society.firebaseapp.com",
  projectId: "better-than-you-society",
  storageBucket: "better-than-you-society.appspot.com",
  messagingSenderId: "821349551727",
  appId: "1:821349551727:web:0801041ff1ab6bd325c79a",
  measurementId: "G-R4EW174VXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);