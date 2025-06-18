// Configuration Firebase temporaire pour le mode démo
const firebaseConfig = {
    apiKey: "demo-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialisation de Firebase (commentée pour le mode démo)
// firebase.initializeApp(firebaseConfig);

// Références aux services Firebase (simulées pour le mode démo)
const auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
        // Simuler un utilisateur non connecté
        callback(null);
        return () => {};
    },
    signInWithEmailAndPassword: async (email, password) => {
        console.log('Mode démo : Tentative de connexion avec', email);
        throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser l\'authentification.');
    },
    createUserWithEmailAndPassword: async (email, password) => {
        console.log('Mode démo : Tentative d\'inscription avec', email);
        throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser l\'authentification.');
    },
    signOut: async () => {
        console.log('Mode démo : Tentative de déconnexion');
        throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser l\'authentification.');
    }
};

const db = {
    collection: (path) => ({
        doc: (id) => ({
            get: async () => {
                console.log('Mode démo : Tentative de lecture du document', path, id);
                throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser la base de données.');
            },
            set: async (data) => {
                console.log('Mode démo : Tentative d\'écriture du document', path, id, data);
                throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser la base de données.');
            },
            update: async (data) => {
                console.log('Mode démo : Tentative de mise à jour du document', path, id, data);
                throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser la base de données.');
            },
            delete: async () => {
                console.log('Mode démo : Tentative de suppression du document', path, id);
                throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser la base de données.');
            }
        }),
        get: async () => {
            console.log('Mode démo : Tentative de lecture de la collection', path);
            throw new Error('Firebase n\'est pas configuré. Veuillez configurer Firebase pour utiliser la base de données.');
        }
    })
};

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