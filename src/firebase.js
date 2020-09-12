import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCSTU7OF8EnlUBXf87hopQH0nXvNULdL2U",
  authDomain: "whatsapp-clone-c46c7.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-c46c7.firebaseio.com",
  projectId: "whatsapp-clone-c46c7",
  storageBucket: "whatsapp-clone-c46c7.appspot.com",
  messagingSenderId: "841774709226",
  appId: "1:841774709226:web:acccbe8fe3470e07f09a93"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;