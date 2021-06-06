import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqDQikvwb20RUCW5I1peijBP42ND0Hus4",
  authDomain: "wa-pg-next.firebaseapp.com",
  projectId: "wa-pg-next",
  storageBucket: "wa-pg-next.appspot.com",
  messagingSenderId: "292015630166",
  appId: "1:292015630166:web:2fca7c5cc68f1376a0d8f7",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
