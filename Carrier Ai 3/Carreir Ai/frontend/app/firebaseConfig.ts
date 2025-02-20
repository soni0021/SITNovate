// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwPCoMa0G453aZVTtMW0dsUmSg6e9Utj4",
    authDomain: "carthive-4d951.firebaseapp.com",
    projectId: "carthive-4d951",
    storageBucket: "carthive-4d951.firebasestorage.app",
    messagingSenderId: "168033676518",
    appId: "1:168033676518:web:504b5407b7845da2b2df27",
    measurementId: "G-516M54CZQE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);