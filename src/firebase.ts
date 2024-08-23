import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8ia0U2uLkbdu-avhy4iCdsM0B3i5AbG8",
  authDomain: "react-notes-16309.firebaseapp.com",
  projectId: "react-notes-16309",
  storageBucket: "react-notes-16309.appspot.com",
  messagingSenderId: "151730547050",
  appId: "1:151730547050:web:fe24e36fd6c10467d29d13",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
