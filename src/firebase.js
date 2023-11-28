import { initializeApp } from "firebase/app";
import { getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
initializeApp(firebaseConfig); 

const db = getFirestore()

const postColRef = collection(db,'posts')

const artColRef = collection(db,'artists')

export { postColRef, artColRef, db}


