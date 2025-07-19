/**
 * Debug script to check for JavaScript errors
 */

console.log('Debug script loaded');

// Check if products are loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Check if products are defined
    if (typeof products !== 'undefined') {
        console.log('Products defined:', products.length);
    } else {
        console.error('Products not defined!');
    }
    
    // Check if product functions are defined
    if (typeof getAllProducts === 'function') {
        console.log('getAllProducts function defined');
        console.log('Products count:', getAllProducts().length);
    } else {
        console.error('getAllProducts function not defined!');
    }
    
    // Check if products grid exists
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        console.log('Products grid found');
        console.log('Products grid content:', productsGrid.innerHTML);
    } else {
        console.error('Products grid not found!');
    }
});