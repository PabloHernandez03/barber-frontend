import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtKTsDILNs4rSA2Iq7nsmAU642fQeqM4I",
  authDomain: "barber-e85d2.firebaseapp.com",
  projectId: "barber-e85d2",
  storageBucket: "barber-e85d2.firebasestorage.app",
  messagingSenderId: "699811185362",
  appId: "1:699811185362:web:742a9484e8933bf91e630b",
  measurementId: "G-CTGK41BG6X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
