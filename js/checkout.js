import { showNotification } from './cart.js';

export function initCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.getElementById('closeModal');
    const checkoutForm = document.getElementById('checkoutForm');
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        checkoutModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('emailCheckout').value;
        const address = document.getElementById('address').value;
        const deliveryDate = document.getElementById('deliveryDate').value;
        const deliveryTime = document.getElementById('deliveryTime').value;
        const clientMessage = document.getElementById('clientMessage').value;
        
        let summary = `StepStyle Order\n\nClient: ${firstName}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nDelivery Date: ${deliveryDate}\nDelivery Time: ${deliveryTime}\n`;
        
        if (clientMessage) {
            summary += `Message: ${clientMessage}\n`;
        }
        
        summary += `\nItems:\n`;
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            summary += `${item.name} x${item.quantity}: €${itemTotal.toFixed(2)}\n`;
            total += itemTotal;
        });
        
        summary += `\nTotal: €${total.toFixed(2)}`;
        
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
        if (isMobile) {
            const smsNumber = '+33644762721';
            const encodedSummary = encodeURIComponent(summary);
            window.location.href = `sms:${smsNumber}?body=${encodedSummary}`;
        } else {
            const emailRecipient = 'contact@stepstyle.com';
            const subject = encodeURIComponent('New StepStyle Order');
            const body = encodeURIComponent(summary);
            window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;
        }
        
        showNotification('Order placed successfully! A summary has been sent.');
        checkoutModal.style.display = 'none';
        cart = [];
        updateCartDisplay();
        localStorage.removeItem('cart');
        checkoutForm.reset();
    });
} 