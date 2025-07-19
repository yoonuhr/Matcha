/**
 * Direct Products Initialization Script
 * This file directly initializes and displays products
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products initialization script loaded');
    
    // Initialize products display immediately
    initializeProductsDisplay();
});

function initializeProductsDisplay() {
    const productsGrid = document.querySelector('.products-grid');
    const categoryFilter = document.querySelector('.category-filter');
    
    if (!productsGrid || !categoryFilter) {
        console.error('Products grid or category filter not found');
        return;
    }
    
    console.log('Initializing products display...');
    
    // Clear existing buttons and recreate them
    categoryFilter.innerHTML = '';
    
    // Create All button
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.dataset.category = 'all';
    allButton.textContent = 'All';
    allButton.onclick = function() {
        setActiveFilter(this);
        displayProducts(getAllProducts());
    };
    categoryFilter.appendChild(allButton);
    
    // Create category buttons
    const categories = getAllCategories();
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.category = category.id;
        button.textContent = category.name;
        button.onclick = function() {
            setActiveFilter(this);
            displayProducts(getProductsByCategory(category.id));
        };
        categoryFilter.appendChild(button);
    });
    
    // Display all products initially
    displayProducts(getAllProducts());
    console.log('Products display initialized successfully');
}

function setActiveFilter(activeButton) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    activeButton.classList.add('active');
}

function displayProducts(productsToDisplay) {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) {
        console.error('Products grid not found');
        return;
    }
    
    console.log(`Displaying ${productsToDisplay.length} products`);
    
    // Clear grid
    productsGrid.innerHTML = '';
    
    // Create product cards
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-accent); font-size: 3rem;&quot;>🍵</div>';">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <p class="product-description">${product.shortDescription}</p>
            <button class="btn view-product-btn" onclick="showProductModal('${product.id}')">View Details</button>
        </div>
    `;
    
    return card;
}

function showProductModal(productId) {
    const product = getProductById(productId);
    const modal = document.getElementById('product-modal');
    const modalContent = document.querySelector('.product-details');
    
    if (!product || !modal || !modalContent) {
        console.error('Product, modal, or modal content not found');
        return;
    }
    
    // Populate modal
    modalContent.innerHTML = `
        <div class="product-details-image">
            <img src="${product.image}" alt="${product.name}" class="product-image"
                 onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=&quot;display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-accent); font-size: 5rem;&quot;>🍵</div>';">
        </div>
        <div class="product-details-info">
            <h2 class="product-details-name">${product.name}</h2>
            <p class="product-details-price">${formatPrice(product.price)}</p>
            <p class="product-details-description">${product.description}</p>
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
                <input type="number" id="quantity-input" class="quantity-input" value="1" min="1" max="99">
                <button class="quantity-btn" onclick="increaseQuantity()">+</button>
            </div>
            <button class="btn add-to-cart-btn" onclick="handleAddToCart('${product.id}')">Add to Cart</button>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.querySelector('.overlay').classList.remove('hidden');
}

function decreaseQuantity() {
    const input = document.getElementById('quantity-input');
    if (input && input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function increaseQuantity() {
    const input = document.getElementById('quantity-input');
    if (input && input.value < 99) {
        input.value = parseInt(input.value) + 1;
    }
}

function handleAddToCart(productId) {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    // Try to use existing cart function
    if (typeof addToCart === 'function') {
        addToCart(productId, quantity);
    } else {
        // Simple fallback
        console.log(`Added ${quantity} of product ${productId} to cart`);
        alert(`Added ${quantity} item(s) to cart!`);
    }
    
    // Close modal
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
        document.querySelector('.overlay').classList.add('hidden');
    }
}