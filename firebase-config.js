// Firebase configuration for NorthxGov Analytics
// Note: These are public keys safe for client-side use
// Sensitive operations are protected by Firestore security rules
export const firebaseConfig = {
    apiKey: "AIzaSyB0ZxOJXUu9a9gtWq8MzLfvNxOaW75BrsA",
    authDomain: "northxgov.firebaseapp.com",
    projectId: "northxgov",
    storageBucket: "northxgov.firebasestorage.app",
    messagingSenderId: "869557900006",
    appId: "1:869557900006:web:0547bef6161afd913ee127",
    measurementId: "G-T1FTYCEF8R"
};

// Minimal config for tracking (same as above, but explicit)
export const publicConfig = {
    apiKey: "AIzaSyB0ZxOJXUu9a9gtWq8MzLfvNxOaW75BrsA",
    authDomain: "northxgov.firebaseapp.com",
    projectId: "northxgov"
};