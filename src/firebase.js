import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBgulbM19HPQbWxTRMy6RpYVnuoW6Cj0YY",
    authDomain: "chat-a4efc.firebaseapp.com",
    projectId: "chat-a4efc",
    storageBucket: "chat-a4efc.appspot.com",
    messagingSenderId: "726801938745",
    appId: "1:726801938745:web:12132b7af5b58c9b8750e8"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

// const analytics = getAnalytics(app);
