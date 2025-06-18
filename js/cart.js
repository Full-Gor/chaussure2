// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function initCart() {
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
            e.stopPropagation();
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantity = parseInt(document.querySelector(`.quantity[data-id="${id}"]`).textContent);
            
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ id, name, price, quantity });
            }
            
            updateCartDisplay();
            showNotification(`${name} added to cart!`);
        });
    });
}

// Update cart display
export function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>€${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>€${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">✕</button></td>
            </tr>
        `;
    });
    
    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const removedItem = cart[index];
            cart.splice(index, 1);
            updateCartDisplay();
            showNotification(`${removedItem.name} removed from cart`);
        });
    });
}

// Notification functionality
export function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
} 