/**
 * Products data and display functionality
 */

// Product categories
const categories = [
    { id: 'powder', name: 'Matcha Powder' },
    { id: 'drinks', name: 'Matcha Drinks' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'gifts', name: 'Gift Sets' }
];

// Product data structure
const products = [
    {
        id: 'ceremonial-grade',
        name: 'Ceremonial Grade Matcha',
        shortDescription: 'Premium ceremonial grade matcha powder from Uji, Japan.',
        description: 'Our finest ceremonial grade matcha is sourced directly from Uji, Japan. This vibrant green powder has a smooth, umami flavor with subtle sweetness and no bitterness. Perfect for traditional matcha preparation and drinking straight.',
        price: 28.99,
        image: 'images/products/ceremonial-matcha.jpg',
        category: 'powder',
        featured: true
    },
    {
        id: 'culinary-grade',
        name: 'Culinary Grade Matcha',
        shortDescription: 'Versatile culinary grade matcha for cooking and baking.',
        description: 'Our culinary grade matcha is perfect for baking, cooking, and blending into smoothies and lattes. It has a stronger flavor that stands up well to other ingredients while still providing the beautiful green color and health benefits of matcha.',
        price: 19.99,
        image: 'images/products/culinary-matcha.jpg',
        category: 'powder',
        featured: false
    },
    {
        id: 'matcha-latte-mix',
        name: 'Matcha Latte Mix',
        shortDescription: 'Ready-to-mix matcha latte blend with natural sweeteners.',
        description: 'Our convenient matcha latte mix combines premium matcha with organic coconut milk powder and a touch of monk fruit sweetener. Just add hot water for an instant, delicious matcha latte anywhere, anytime.',
        price: 15.99,
        image: 'images/products/latte-mix.jpg',
        category: 'drinks',
        featured: true
    },
    {
        id: 'matcha-whisk',
        name: 'Bamboo Matcha Whisk (Chasen)',
        shortDescription: 'Traditional bamboo whisk for preparing matcha.',
        description: 'This handcrafted bamboo whisk (chasen) is the traditional tool for preparing matcha. Its 100 prongs are designed to create the perfect froth and break up clumps for a smooth, well-mixed matcha experience.',
        price: 12.99,
        image: 'images/products/bamboo-whisk.jpg',
        category: 'accessories',
        featured: false
    },
    {
        id: 'matcha-bowl',
        name: 'Ceramic Matcha Bowl (Chawan)',
        shortDescription: 'Artisan ceramic bowl for traditional matcha preparation.',
        description: 'Our beautiful ceramic matcha bowl (chawan) is handcrafted by artisans to create the perfect vessel for preparing and enjoying matcha. The wide shape and textured interior help create the perfect froth.',
        price: 24.99,
        image: 'images/products/matcha-bowl.jpg',
        category: 'accessories',
        featured: true
    },
    {
        id: 'starter-kit',
        name: 'Matcha Starter Kit',
        shortDescription: 'Everything you need to begin your matcha journey.',
        description: 'The perfect introduction to the world of matcha. This starter kit includes our ceremonial grade matcha powder, bamboo whisk (chasen), bamboo scoop (chashaku), and a ceramic bowl (chawan) - everything you need to prepare matcha the traditional way.',
        price: 59.99,
        image: 'images/products/starter-kit.jpg',
        category: 'gifts',
        featured: true
    },
    {
        id: 'matcha-tin',
        name: 'Matcha Storage Tin',
        shortDescription: 'Airtight tin for keeping matcha fresh.',
        description: 'Keep your matcha fresh and protected from light, moisture, and odors with our airtight matcha storage tin. The double-lid design ensures maximum freshness, preserving the delicate flavors and antioxidants of your matcha.',
        price: 9.99,
        image: 'images/products/matcha-tin.jpg',
        category: 'accessories',
        featured: false
    },
    {
        id: 'iced-matcha',
        name: 'Ready-to-Drink Iced Matcha',
        shortDescription: 'Refreshing iced matcha in a convenient bottle.',
        description: 'Our ready-to-drink iced matcha is perfect for matcha lovers on the go. Made with our premium matcha and lightly sweetened with organic cane sugar, it\'s a refreshing and energizing drink for any time of day.',
        price: 4.99,
        image: 'images/products/iced-matcha.jpg',
        category: 'drinks',
        featured: false
    },
    {
        id: 'luxury-gift-set',
        name: 'Luxury Matcha Gift Set',
        shortDescription: 'Premium gift set with our finest matcha and accessories.',
        description: 'Our luxury gift set is the ultimate matcha experience. It includes our highest-grade ceremonial matcha, handcrafted ceramic bowl, artisan bamboo whisk, bamboo scoop, and a beautiful wooden whisk holder, all presented in an elegant gift box.',
        price: 89.99,
        image: 'images/products/luxury-gift.jpg',
        category: 'gifts',
        featured: true
    },
    {
        id: 'matcha-scoop',
        name: 'Bamboo Matcha Scoop (Chashaku)',
        shortDescription: 'Traditional bamboo scoop for measuring matcha.',
        description: 'This traditional bamboo scoop (chashaku) is carved from a single piece of bamboo and designed to measure the perfect amount of matcha powder for a single serving. An essential tool for authentic matcha preparation.',
        price: 7.99,
        image: 'images/products/bamboo-scoop.jpg',
        category: 'accessories',
        featured: false
    }
];

/**
 * Get all products
 * @returns {Array} All products
 */
function getAllProducts() {
    return products;
}

/**
 * Get products by category
 * @param {string} categoryId - Category ID
 * @returns {Array} Filtered products
 */
function getProductsByCategory(categoryId) {
    if (categoryId === 'all') {
        return products;
    }
    return products.filter(product => product.category === categoryId);
}

/**
 * Get featured products
 * @returns {Array} Featured products
 */
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

/**
 * Get product by ID
 * @param {string} productId - Product ID
 * @returns {Object} Product object
 */
function getProductById(productId) {
    return products.find(product => product.id === productId);
}

/**
 * Format price as currency
 * @param {number} price - Price to format
 * @returns {string} Formatted price
 */
function formatPrice(price) {
    return '$$' + price.toFixed(2);
}

/**
 * Get all categories
 * @returns {Array} All categories
 */
function getAllCategories() {
    return categories;
}