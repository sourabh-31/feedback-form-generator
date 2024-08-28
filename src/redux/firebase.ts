import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_v-qt1x9X6nurBeh1ueoW0zAKMo1onF0",
  authDomain: "feedback-form-builder-35945.firebaseapp.com",
  projectId: "feedback-form-builder-35945",
  storageBucket: "feedback-form-builder-35945.appspot.com",
  messagingSenderId: "525994193035",
  appId: "1:525994193035:web:3f453e14e97a136b53e48e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
