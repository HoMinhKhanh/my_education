// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKk1TMkHpIRLKHLT-jNPzRuisN8OMpAso",
  authDomain: "capstone1-47918.firebaseapp.com",
  projectId: "capstone1-47918",
  storageBucket: "capstone1-47918.appspot.com",
  messagingSenderId: "1096613144647",
  appId: "1:1096613144647:web:63b44f8ab33cf405536962",
  measurementId: "G-BPENGHW5VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
export { app, analytics };
