/**
 * Shopping cart functionality
 */

// Cart data structure
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('matchaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('matchaCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    // Get product details
    const product = getProductById(productId);
    if (!product) return;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item
        cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    // Save cart
    saveCart();
    
    // Update cart UI
    updateCartUI();
    
    // Show notification
    showNotification(`Added ${quantity} ${product.name} to cart`);
}

// Remove item from cart
function removeFromCart(productId) {
    // Find item index
    const itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex !== -1) {
        // Remove item
        cart.splice(itemIndex, 1);
        
        // Save cart
        saveCart();
        
        // Update cart UI
        updateCartUI();
    }
}

// Update item quantity
function updateCartItemQuantity(productId, quantity) {
    // Find item
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        // Update quantity
        item.quantity = quantity;
        
        // If quantity is 0, remove item
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        // Save cart
        saveCart();
        
        // Update cart UI
        updateCartUI();
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = getCartItemCount();
    
    // Update cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Create placeholder image div (in a real implementation, this would be an actual image)
            const imageDiv = document.createElement('div');
            imageDiv.className = 'cart-item-image-placeholder';
            imageDiv.innerHTML = `<i class="fas fa-leaf"></i>`;
            
            const itemDetails = document.createElement('div');
            itemDetails.className = 'cart-item-details';
            
            itemDetails.innerHTML = `
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="cart-item-decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-item-increase">+</button>
                    <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            cartItem.appendChild(imageDiv);
            cartItem.appendChild(itemDetails);
            cartItemsContainer.appendChild(cartItem);
            
            // Add event listeners
            const decreaseBtn = cartItem.querySelector('.cart-item-decrease');
            const increaseBtn = cartItem.querySelector('.cart-item-increase');
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            
            decreaseBtn.addEventListener('click', () => {
                updateCartItemQuantity(item.productId, item.quantity - 1);
            });
            
            increaseBtn.addEventListener('click', () => {
                updateCartItemQuantity(item.productId, item.quantity + 1);
            });
            
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.productId);
            });
        });
    }
    
    // Update cart total
    const cartTotal = document.getElementById('cart-total-amount');
    cartTotal.textContent = formatPrice(calculateCartTotal());
    
    // Update checkout button state
    const checkoutBtn = document.getElementById('checkout-btn');
    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('disabled');
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('disabled');
    }
}

// Show notification
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        // Create notification container
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    loadCart();
    
    // Update cart UI
    updateCartUI();
    
    // Add event listener to checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            // Show checkout section
            document.getElementById('checkout').classList.remove('hidden');
            
            // Hide cart
            document.getElementById('shopping-cart').classList.remove('active');
            
            // Scroll to checkout section
            window.scrollTo({
                top: document.getElementById('checkout').offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update order summary
            updateOrderSummary();
        }
    });
});

// Update order summary
function updateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Update order total
    const orderTotal = document.getElementById('order-total-amount');
    orderTotal.textContent = formatPrice(calculateCartTotal());
    
    // Initialize checkout form
    initCheckoutForm();
}

// Initialize checkout form
function initCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    // Add event listener to form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(checkoutForm);
        const customerName = formData.get('name');
        const customerEmail = formData.get('email');
        const orderNotes = formData.get('notes');
        
        // Create order object
        const order = {
            id: generateOrderId(),
            customerName,
            customerEmail,
            orderNotes,
            items: [...cart],
            totalPrice: calculateCartTotal(),
            orderDate: new Date().toISOString()
        };
        
        // Save order to localStorage
        saveOrder(order);
        
        // Show payment section
        document.getElementById('checkout').classList.add('hidden');
        document.getElementById('payment').classList.remove('hidden');
        
        // Update payment information
        document.getElementById('order-number').textContent = order.id;
        document.getElementById('payment-amount').textContent = formatPrice(order.totalPrice);
        
        // Scroll to payment section
        window.scrollTo({
            top: document.getElementById('payment').offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Initialize payment confirmation
        initPaymentConfirmation(order);
    });
    
    // Add form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    nameInput.addEventListener('input', validateInput);
    emailInput.addEventListener('input', validateInput);
    
    function validateInput() {
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        
        if (nameInput.value.trim() !== '' && emailInput.value.trim() !== '' && isValidEmail(emailInput.value)) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('disabled');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('disabled');
        }
    }
    
    // Initial validation
    validateInput();
}

// Generate order ID
function generateOrderId() {
    return 'MH' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
}

// Save order to localStorage
function saveOrder(order) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('matchaOrders') || '[]');
    
    // Add new order
    orders.push(order);
    
    // Save orders
    localStorage.setItem('matchaOrders', JSON.stringify(orders));
}

// Initialize payment confirmation
function initPaymentConfirmation(order) {
    const paymentSentBtn = document.getElementById('payment-sent-btn');
    const copyOrderNumberBtn = document.getElementById('copy-order-number');
    
    // Add event listener to copy order number button
    copyOrderNumberBtn.addEventListener('click', function() {
        const orderNumber = document.getElementById('order-number').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(orderNumber).then(() => {
            // Show notification
            showNotification('Order number copied to clipboard');
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
    
    paymentSentBtn.addEventListener('click', function() {
        // Show confirmation section
        document.getElementById('payment').classList.add('hidden');
        document.getElementById('confirmation').classList.remove('hidden');
        
        // Update confirmation information
        document.getElementById('confirmation-order-number').textContent = order.id;
        
        // Scroll to confirmation section
        window.scrollTo({
            top: document.getElementById('confirmation').offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}/**

 * Additional validation and error handling for cart functionality
 */

// Validate cart data
function validateCartData() {
    // Filter out invalid items
    cart = cart.filter(item => {
        // Check if item has all required properties
        if (!item.productId || !item.name || item.price === undefined || item.quantity === undefined) {
            console.warn('Invalid cart item removed:', item);
            return false;
        }
        
        // Check if product still exists
        const product = getProductById(item.productId);
        if (!product) {
            console.warn('Product no longer exists, removing from cart:', item);
            return false;
        }
        
        // Ensure quantity is a positive integer
        if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
            item.quantity = 1;
        }
        
        // Update price in case it changed
        item.price = product.price;
        
        return true;
    });
    
    // Save validated cart
    saveCart();
}

// Add error handling to cart functions
const originalAddToCart = addToCart;
addToCart = function(productId, quantity = 1) {
    try {
        // Validate inputs
        if (!productId) {
            throw new Error('Product ID is required');
        }
        
        if (typeof quantity !== 'number' || quantity <= 0) {
            quantity = 1;
        }
        
        return originalAddToCart(productId, quantity);
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add item to cart. Please try again.');
    }
};

// Validate cart on load
document.addEventListener('DOMContentLoaded', function() {
    try {
        validateCartData();
    } catch (error) {
        console.error('Error validating cart data:', error);
        // Reset cart if validation fails
        cart = [];
        saveCart();
    }
});