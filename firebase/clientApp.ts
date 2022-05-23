import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDCXK1iOoG3UgQ8mQk2XrpRP71cWyGwza0",
    authDomain: "partner-petualang.firebaseapp.com",
    projectId: "partner-petualang",
    storageBucket: "partner-petualang.appspot.com",
    messagingSenderId: "206016083537",
    appId: "1:206016083537:web:04e93c17813e91d0d92a70",
    measurementId: "G-1T0E2PNTK1"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();


export { db, storage };