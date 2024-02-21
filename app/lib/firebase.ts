import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

// PRODUCTION
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// DEVELOPMENT
const firebaseConfig = {
  apiKey: "AIzaSyAjsxgtt0F4fFNPWU3sXEkP_EeQU55DzkI",
  authDomain: "cleros-dev.firebaseapp.com",
  projectId: "cleros-dev",
  storageBucket: "cleros-dev.appspot.com",
  messagingSenderId: "974566314467",
  appId: "1:974566314467:web:b8faeb5b8627568ff790d6",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();

export default auth;
