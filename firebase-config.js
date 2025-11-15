const firebaseConfig = {
  apiKey: "AIzaSyCOnmI0VZn-4LI_QBWAIaxomdljv2VpU6Y",
  authDomain: "undangan-karin-fandi.firebaseapp.com",
  projectId: "undangan-karin-fandi",
  storageBucket: "undangan-karin-fandi.firebasestorage.app",
  messagingSenderId: "1044231888679",
  appId: "1:1044231888679:web:b2fbad235c01e54ae31302"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export untuk digunakan di app.js
window.db = db;
