import { initializeApp } from "firebase/app";
import { getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBDUHT2kmwrJOk-ZZBfFznhzLCfKXYK6k",
  authDomain: "art-gallery-28554.firebaseapp.com",
  projectId: "art-gallery-28554",
  storageBucket: "art-gallery-28554.appspot.com",
  messagingSenderId: "533797048054",
  appId: "1:533797048054:web:e5ac9725dbb47c90f4e6d7"
};

// Initialize Firebase
initializeApp(firebaseConfig); 

const db = getFirestore()

const postColRef = collection(db,'posts')

const artColRef = collection(db,'artists')

export { postColRef, artColRef, db}


