// Configuration Firebase
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialisation Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const storage = {
    ref: (path) => ({
        put: async (file) => {
            console.log('Mode démo : Tentative d\'upload de fichier', path);
            throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser le stockage.');
        },
        getDownloadURL: async () => {
            console.log('Mode démo : Tentative d\'obtention de l\'URL', path);
            throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser le stockage.');
        }
    })
};

export { auth, db, storage }; 