// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh_7KoUkeqybCgYCH_561Rp1TOHjSg8Wk",
    authDomain: "mensajes-online-f6905.firebaseapp.com",
    databaseURL: "https://mensajes-online-f6905-default-rtdb.firebaseio.com",
    projectId: "mensajes-online-f6905",
    storageBucket: "mensajes-online-f6905.appspot.com",
    messagingSenderId: "203126916972",
    appId: "1:203126916972:web:d9b74627c088d30dd9d549",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);
