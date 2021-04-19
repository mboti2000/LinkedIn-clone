import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBjKzwm_gg7SBBstC6bWhpsONrFTB0Lauc",
    authDomain: "linkedin-clone-89261.firebaseapp.com",
    projectId: "linkedin-clone-89261",
    storageBucket: "linkedin-clone-89261.appspot.com",
    messagingSenderId: "65781148389",
    appId: "1:65781148389:web:c1ef325bb14a233f30c20c",
    measurementId: "G-VYWE0KPVYZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };