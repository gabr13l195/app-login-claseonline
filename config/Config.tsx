// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh_7KoUkeqybCgYCH_561Rp1TOHjSg8Wk",
    authDomain: "mensajes-online-f6905.firebaseapp.com",
    projectId: "mensajes-online-f6905",
    storageBucket: "mensajes-online-f6905.firebasestorage.app",
    messagingSenderId: "203126916972",
    appId: "1:203126916972:web:d9b74627c088d30dd9d549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app)