// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2VTpkVpyhTJaSIsSd7EK3zswovvrNJ54",
  authDomain: "planetaipfrontend.firebaseapp.com",
  projectId: "planetaipfrontend",
  storageBucket: "planetaipfrontend.appspot.com",
  messagingSenderId: "1082731767656",
  appId: "1:1082731767656:web:5888f2dfee7df67c76d8dd"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;