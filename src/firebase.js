import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3GBXMea90DTlyY8wdbbG8KhIT95IhK_Q",
  authDomain: "discord-1336e.firebaseapp.com",
  projectId: "discord-1336e",
  storageBucket: "discord-1336e.appspot.com",
  messagingSenderId: "929369096104",
  appId: "1:929369096104:web:870a45642930b1ab96e79d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();

export { db, auth, google };
