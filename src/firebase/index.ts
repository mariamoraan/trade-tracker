import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbSrrcgEhf3E_uI21xZvOQ4nBnheT-fPU",
    authDomain: "orders-tracker-999e9.firebaseapp.com",
    projectId: "orders-tracker-999e9",
    storageBucket: "orders-tracker-999e9.appspot.com",
    messagingSenderId: "36278278547",
    appId: "1:36278278547:web:c354aa2b99000c46347066",
    measurementId: "G-87G34TF1L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firebaseAuthProvider = getAuth(app);


