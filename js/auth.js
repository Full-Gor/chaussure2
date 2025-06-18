// Configuration Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction pour vérifier si l'utilisateur est connecté
export function isAuthenticated() {
    return auth.currentUser !== null;
}

// Fonction pour rediriger vers la page de connexion si non authentifié
export function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
    }
}

// Fonction d'inscription
export async function signUp(email, password, firstName, lastName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Créer le profil utilisateur dans Firestore
        await db.collection('users').doc(user.uid).set({
            firstName,
            lastName,
            email,
            role: 'user',
            createdAt: new Date(),
            orders: []
        });
        
        showNotification('Inscription réussie !');
        return user;
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}

// Fonction de connexion
export async function signIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showNotification('Connexion réussie !');
        return userCredential.user;
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}

// Fonction de déconnexion
export async function signOut() {
    try {
        await auth.signOut();
        showNotification('Déconnexion réussie !');
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}

// Vérifier l'état de l'authentification
export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

// Récupérer les informations de l'utilisateur
export async function getUserData(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        return doc.data();
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}

// Mettre à jour le profil utilisateur
export async function updateUserProfile(userId, data) {
    try {
        await db.collection('users').doc(userId).update(data);
        showNotification('Profil mis à jour avec succès !');
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
}

// Exporter les instances Firebase
export { auth, db }; 