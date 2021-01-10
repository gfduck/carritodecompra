import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcyEp2DTY-TFpnIH1SDGc1DDOjEKgr9qs",
  authDomain: "proyecto-prueba-6443e.firebaseapp.com",
  databaseURL: "https://proyecto-prueba-6443e.firebaseio.com",
  projectId: "proyecto-prueba-6443e",
  storageBucket: "proyecto-prueba-6443e.appspot.com",
  messagingSenderId: "640073973724",
  appId: "1:640073973724:web:11238dc886a477932b1919",
  measurementId: "G-24T8ELH4QE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
