// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import algoliasearch from "algoliasearch/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const is_dev = process.env.NODE_ENV === "development";

const firebaseConfig = {
  apiKey: is_dev ? "AIzaSyAaiwgYeV1mlYWjfkLscUsQ_K8nAiC9ims" : "AIzaSyCuMkR9ep3Aj_L3RZ5Zvir0iULbz8lIM_A",
  authDomain: is_dev ? "beter-than-you-society.firebaseapp.com" : "btys-production.firebaseapp.com",
  projectId: is_dev ? "better-than-you-society" : "btys-production",
  storageBucket: is_dev ? "better-than-you-society.appspot.com" : "btys-production.appspot.com",
  messagingSenderId: is_dev ? "821349551727" : "269241867312",
  appId: is_dev ? "1:821349551727:web:0801041ff1ab6bd325c79a" : "1:269241867312:web:eecccc5fa387aa444de1f5",
  measurementId: is_dev ? "G-R4EW174VXJ" : "G-ED6C9BHHNB"
};

// Initialize Firebase
if (!getApps.length) {
  initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    if ("measurementId" in firebaseConfig) {
      getAnalytics();
    }
  }
}

export const auth = getAuth(getApp());
if (is_dev) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export const functions = getFunctions(getApp());
if (is_dev) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export const firestore = getFirestore(getApp());
if (is_dev) {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export const searchClient = algoliasearch(
  "ESJNVTMAC5",
  "b4f5dee6147ac25d02b68b344b35a7a1"
);