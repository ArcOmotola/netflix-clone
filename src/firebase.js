import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTnK0GGcopp0ib23FqLOUimZ-mFZ2seyI",
    authDomain: "netflix-clone-35ca2.firebaseapp.com",
    projectId: "netflix-clone-35ca2",
    storageBucket: "netflix-clone-35ca2.appspot.com",
    messagingSenderId: "806656623688",
    appId: "1:806656623688:web:d4167493d587f9ac0e847d",
    measurementId: "G-XKNXD2922K"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;