import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKUrNcmi-JVv7Oau8093iykTua-PJ7moQ",
  authDomain: "todo-me-59494.firebaseapp.com",
  projectId: "todo-me-59494",
  storageBucket: "todo-me-59494.appspot.com",
  messagingSenderId: "728640242487",
  appId: "1:728640242487:web:57c2d560a2e4ed0801d0b2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
