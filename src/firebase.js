// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZHs3_T2oyzhR_2bud_IeGCUUibN17cGY",
  authDomain: "finals-dashboard.firebaseapp.com",
  projectId: "finals-dashboard",
  storageBucket: "finals-dashboard.firebasestorage.app",
  messagingSenderId: "309964803826",
  appId: "1:309964803826:web:29ab59421dbcdbd7174a6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = getAuth(app);

export { auth };
