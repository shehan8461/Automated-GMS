// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuSQ_sO7rAUmC3R5nvVgtWPeneY3CeKUY",
  authDomain: "finance-management-syste-4aad6.firebaseapp.com",
  projectId: "finance-management-syste-4aad6",
  storageBucket: "finance-management-syste-4aad6.appspot.com",
  messagingSenderId: "283370041553",
  appId: "1:283370041553:web:cf2729f6615c9ecfb355f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
