
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOxUQ1iZvdbB8YDpajFWW7Tp90ldoWUr4",
    authDomain: "auth-3409a.firebaseapp.com",
    projectId: "auth-3409a",
    storageBucket: "auth-3409a.appspot.com",
    messagingSenderId: "201984196589",
    appId: "1:201984196589:web:1484c18d270c46d1cfb1e4",
    measurementId: "G-6WG1FF9C4Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
