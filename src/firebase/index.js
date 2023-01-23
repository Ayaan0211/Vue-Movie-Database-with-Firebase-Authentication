import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAzgamonrH9iJtnDj5VaEgLgpKSqG0Eng",
  authDomain: "ics4u-summative-c33ff.firebaseapp.com",
  projectId: "ics4u-summative-c33ff",
  storageBucket: "ics4u-summative-c33ff.appspot.com",
  messagingSenderId: "1098153505912",
  appId: "1:1098153505912:web:5754f61ae687aa8dd4a98d",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, firestore, storage };
