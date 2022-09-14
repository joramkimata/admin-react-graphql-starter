import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCkVRUrOYVZZPtPRW_oVFtYhi3iZZuRMYU",
    authDomain: "izweb-academy.firebaseapp.com",
    projectId: "izweb-academy",
    storageBucket: "izweb-academy.appspot.com",
    messagingSenderId: "1023303769769",
    appId: "1:1023303769769:web:c1ccef0a966bb0aa6193b8"
};

const app = initializeApp(firebaseConfig);


// Firebase storage reference
const storage = getStorage(app);

export default storage;