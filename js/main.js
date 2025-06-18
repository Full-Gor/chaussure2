import { initNavigation } from './navigation.js';
import { initCart, updateCartDisplay, cart } from './cart.js';
import { initCheckout } from './checkout.js';
import { auth } from './auth.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initCart();
    initCheckout();
    
    // Initialize cart display
    updateCartDisplay();
    
    // Portfolio card flip functionality
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    let currentFlipped = null;
    
    portfolioLinks.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gestion des quantités
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.dataset.id;
            const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.classList.contains('plus')) {
                quantity++;
            } else if (quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
        });
    });
    
    // Ajout au panier
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const quantity = parseInt(document.querySelector(`.quantity[data-id="${productId}"]`).textContent);
            const productImage = this.closest('.portfolio-card').querySelector('img').src;
            
            cart.addItem({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity,
                image: productImage
            });
            
            // Notification
            const notification = document.getElementById('notification');
            notification.textContent = 'Produit ajouté au panier';
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        });
    });
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Envoyer les données
            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // Notification de succès
                const notification = document.getElementById('notification');
                notification.textContent = 'Message envoyé avec succès';
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
                
                // Réinitialiser le formulaire
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // Notification d'erreur
                const notification = document.getElementById('notification');
                notification.textContent = 'Une erreur est survenue';
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            });
        });
    }
}); 