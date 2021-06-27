import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD9GjKDMDpTnETreEcAAaTBmNI0ysr-soI",
  authDomain: "qwitter-391ac.firebaseapp.com",
  projectId: "qwitter-391ac",
  storageBucket: "qwitter-391ac.appspot.com",
  messagingSenderId: "112426752075",
  appId: "1:112426752075:web:f3ca19d2d21f3d5faad5ce"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;