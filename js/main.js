import { initNavigation } from './navigation.js';
import { initCart, updateCartDisplay } from './cart.js';
import { initCheckout } from './checkout.js';

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
            e.preventDefault();
            if (e.target.classList.contains('minus-btn') || 
                e.target.classList.contains('plus-btn') || 
                e.target.classList.contains('add-to-cart')) {
                return;
            }
            if (currentFlipped && currentFlipped !== this) {
                currentFlipped.classList.remove('flipped');
            }
            this.classList.toggle('flipped');
            if (this.classList.contains('flipped')) {
                currentFlipped = this;
            } else {
                currentFlipped = null;
            }
        });
    });
    
    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const category = this.getAttribute('data-category');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 