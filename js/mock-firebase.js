// Mock Firebase pour les tests
class MockFirebase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('mock_users')) || [];
        this.products = JSON.parse(localStorage.getItem('mock_products')) || [];
        this.orders = JSON.parse(localStorage.getItem('mock_orders')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('mock_current_user')) || null;
        
        // Données de test
        if (this.users.length === 0) {
            this.users = [
                {
                    id: '1',
                    email: 'admin@test.com',
                    password: 'admin123',
                    firstName: 'Admin',
                    lastName: 'User',
                    role: 'admin'
                },
                {
                    id: '2',
                    email: 'user@test.com',
                    password: 'user123',
                    firstName: 'Test',
                    lastName: 'User',
                    role: 'user'
                }
            ];
            this.saveUsers();
        }
        
        if (this.products.length === 0) {
            this.products = [
                {
                    id: '1',
                    name: 'Nike Air Max',
                    price: 129.99,
                    description: 'Chaussure de sport confortable',
                    category: 'sneakers',
                    stock: 10
                }
            ];
            this.saveProducts();
        }
    }
    
    // Méthodes d'authentification
    async signIn(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = { ...user };
            delete this.currentUser.password;
            localStorage.setItem('mock_current_user', JSON.stringify(this.currentUser));
            return { user: this.currentUser };
        }
        throw new Error('Email ou mot de passe incorrect');
    }
    
    async signUp(email, password, firstName, lastName) {
        if (this.users.some(u => u.email === email)) {
            throw new Error('Cet email est déjà utilisé');
        }
        
        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            firstName,
            lastName,
            role: 'user'
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        return this.signIn(email, password);
    }
    
    async signOut() {
        this.currentUser = null;
        localStorage.removeItem('mock_current_user');
    }
    
    // Méthodes CRUD pour les produits
    async getProducts() {
        return this.products;
    }
    
    async addProduct(product) {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            throw new Error('Accès non autorisé');
        }
        
        const newProduct = {
            id: Date.now().toString(),
            ...product
        };
        
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    
    async updateProduct(id, data) {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            throw new Error('Accès non autorisé');
        }
        
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produit non trouvé');
        
        this.products[index] = { ...this.products[index], ...data };
        this.saveProducts();
        return this.products[index];
    }
    
    async deleteProduct(id) {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            throw new Error('Accès non autorisé');
        }
        
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produit non trouvé');
        
        this.products.splice(index, 1);
        this.saveProducts();
    }
    
    // Méthodes de sauvegarde
    saveUsers() {
        localStorage.setItem('mock_users', JSON.stringify(this.users));
    }
    
    saveProducts() {
        localStorage.setItem('mock_products', JSON.stringify(this.products));
    }
    
    saveOrders() {
        localStorage.setItem('mock_orders', JSON.stringify(this.orders));
    }
}

// Export de l'instance
const mockFirebase = new MockFirebase();
export const auth = {
    signInWithEmailAndPassword: (email, password) => mockFirebase.signIn(email, password),
    createUserWithEmailAndPassword: (email, password) => mockFirebase.signUp(email, password),
    signOut: () => mockFirebase.signOut(),
    currentUser: mockFirebase.currentUser
};

export const db = {
    collection: (name) => ({
        add: (data) => {
            if (name === 'products') return mockFirebase.addProduct(data);
            throw new Error('Collection non supportée en mode test');
        },
        doc: (id) => ({
            update: (data) => {
                if (name === 'products') return mockFirebase.updateProduct(id, data);
                throw new Error('Collection non supportée en mode test');
            },
            delete: () => {
                if (name === 'products') return mockFirebase.deleteProduct(id);
                throw new Error('Collection non supportée en mode test');
            }
        }),
        get: () => {
            if (name === 'products') return mockFirebase.getProducts();
            throw new Error('Collection non supportée en mode test');
        }
    })
}; 