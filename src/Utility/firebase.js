// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDelsVBsJ_8FYLl6h9DOHPgGpLy8Rp5YxY",
  authDomain: "movie-website-2c1b0.firebaseapp.com",
  projectId: "movie-website-2c1b0",
  storageBucket: "movie-website-2c1b0.appspot.com",
  messagingSenderId: "618554070972",
  appId: "1:618554070972:web:65e292686331d84cf77db9",
  measurementId: "G-8025VSQZ1P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);