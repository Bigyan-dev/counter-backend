import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAF4j7g87Y5pRqseyibCqQisFHLZ3iGp2c",
    authDomain: "user-authentication-ede46.firebaseapp.com",
    projectId: "user-authentication-ede46",
    storageBucket: "user-authentication-ede46.firebasestorage.app",
    messagingSenderId: "930972753303",
    appId: "1:930972753303:web:5d231c1fa87b83149038d2",
    measurementId: "G-47DXP69F23"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth, provider}    