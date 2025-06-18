import { auth, db } from './config.js';
import { showNotification } from './cart.js';

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