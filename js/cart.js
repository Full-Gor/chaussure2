        // Gestion du panier avec localStorage
        export class Cart {
            constructor() {
                this.items = JSON.parse(localStorage.getItem('cart') || '[]');
                this.updateDisplay();
                console.log('Cart initialized:', this.items);
            }
            
            // Ajouter un produit au panier
            addItem(product) {
                console.log('Adding product to cart:', product);
                const existingItem = this.items.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += product.quantity || 1;
                } else {
                    this.items.push({
                        ...product,
                        quantity: product.quantity || 1
                    });
                }
                
                this.save();
                this.updateDisplay();
                console.log('Cart after adding:', this.items);
            }
            
            // Mettre à jour la quantité
            updateQuantity(id, quantity) {
                const item = this.items.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity;
                    if (item.quantity <= 0) {
                        this.removeItem(id);
                    } else {
                        this.save();
                        this.updateDisplay();
                    }
                }
            }
            
            // Supprimer un produit
            removeItem(id) {
                this.items = this.items.filter(item => item.id !== id);
                this.save();
                this.updateDisplay();
            }
            
            // Vider le panier
            clear() {
                this.items = [];
                this.save();
                this.updateDisplay();
            }
            
            // Calculer le total
            getTotal() {
                return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
            
            // Obtenir le nombre total d'articles
            getCount() {
                return this.items.reduce((count, item) => count + item.quantity, 0);
            }
            
            // Sauvegarder dans localStorage
            save() {
                localStorage.setItem('cart', JSON.stringify(this.items));
            }
            
            // Mettre à jour l'affichage
            updateDisplay() {
                console.log('Updating cart display');
                // Mettre à jour le compteur dans la navbar
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = this.getCount();
                }
                
                // Mettre à jour le tableau du panier
                const cartItems = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');
                
                if (cartItems && cartTotal) {
                    cartItems.innerHTML = '';
                    let total = 0;
                    
                    this.items.forEach((item, index) => {
                        const itemTotal = item.price * item.quantity;
                        total += itemTotal;
                        
                        cartItems.innerHTML += `
                            <tr>
                                <td>${item.name}</td>
                                <td>€${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>€${itemTotal.toFixed(2)}</td>
                                <td><button class="remove-item" data-id="${item.id}">✕</button></td>
                            </tr>
                        `;
                    });
                    
                    cartTotal.textContent = total.toFixed(2);
                    
                    // Add event listeners to remove buttons
                    document.querySelectorAll('.remove-item').forEach(button => {
                        button.addEventListener('click', () => {
                            const id = button.dataset.id;
                            const removedItem = this.items.find(item => item.id === id);
                            this.removeItem(id);
                            showNotification(`${removedItem.name} removed from cart`);
                        });
                    });
                }
                
                // Émettre un événement pour notifier les autres composants
                window.dispatchEvent(new CustomEvent('cart-updated', {
                    detail: {
                        items: this.items,
                        total: this.getTotal(),
                        count: this.getCount()
                    }
                }));
            }
        }

        // Créer une instance unique du panier
        export const cart = new Cart();

        // Cart functionality
        export function initCart() {
            console.log('Initializing cart functionality');
            
            // Quantity controls
            document.querySelectorAll('.minus-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = button.dataset.id;
                    const quantitySpan = document.querySelector(`.quantity[data-id="${id}"]`);
                    let quantity = parseInt(quantitySpan.textContent);
                    if (quantity > 1) {
                        quantitySpan.textContent = --quantity;
                    }
                });
            });
            
            document.querySelectorAll('.plus-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = button.dataset.id;
                    const quantitySpan = document.querySelector(`.quantity[data-id="${id}"]`);
                    let quantity = parseInt(quantitySpan.textContent);
                    quantitySpan.textContent = ++quantity;
                });
            });
            
            // Add to cart
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Add to cart button clicked');
                    
                    const id = button.dataset.id;
                    const name = button.dataset.name;
                    const price = parseFloat(button.dataset.price);
                    const quantity = parseInt(document.querySelector(`.quantity[data-id="${id}"]`).textContent);
                    
                    console.log('Product details:', { id, name, price, quantity });
                    
                    cart.addItem({ id, name, price, quantity });
                    showNotification(`${name} added to cart!`);
                }); 
            });
        }

        // Notification functionality
        export function showNotification(message) {
            const notification = document.getElementById('notification');
            if (notification) {
                notification.textContent = message;
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            } else {
                console.warn('Notification element not found');
            }
        } 