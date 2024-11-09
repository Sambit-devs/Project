// Initialize the cart array
let cart = [];

// Select HTML elements
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeModalButton = document.getElementById('close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const emptyCartButton = document.getElementById('empty-cart');
const totalPriceElement = document.getElementById('total-price');
const searchInput = document.getElementById('search-input');  // Search input element
const searchButton = document.getElementById('search-button');  // Search button element
const productListContainer = document.querySelector('.product-list'); // Product listing container

// Product data (with price, name, and image)
const products = [
    { id: 1, name: 'JAGUAR Classic Black Perfume', price: 1799, img: 'images/product1.png' },
    { id: 2, name: "BellaVita Perfume", price: 2299, img: 'images/product2.png' },
    { id: 3, name: 'SAUVAGE Elixir Dior', price: 1699, img: 'images/product3.png' }
];

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.closest('.product-card').getAttribute('data-product-id'));
        addToCart(productId);
    });
});

// Function to add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();  // Update cart count after adding item
        displayCartItems();  // Update the cart display
    }
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = cart.length;
    cartButton.textContent = `Cart (${cartCount})`;  // Update the cart button text
}

// Function to open the cart modal
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';  // Show the modal
    displayCartItems();  // Display the updated cart items
});

// Close the cart modal
closeModalButton.addEventListener('click', () => {
    cartModal.style.display = 'none';  // Hide the modal
});

// Function to display cart items inside the modal
function displayCartItems() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '0';  // Set total price to 0 if the cart is empty
    } else {
        cartItemsList.innerHTML = '';  // Clear the current cart items
        let total = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            cartItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}" width="50" />
                <div>${product.name}</div>
                <div>₹${product.price}</div>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsList.appendChild(cartItem);
            total += product.price;  // Calculate total price
        });

        totalPriceElement.textContent = `${total}`;  // Display the total price
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove the item from the cart
    updateCartCount();      // Update the cart count
    displayCartItems();     // Update the cart display
}

// Empty the cart
emptyCartButton.addEventListener('click', () => {
    cart = [];  // Clear the cart
    updateCartCount();  // Reset the cart count
    displayCartItems();  // Clear the cart display
});

// Search functionality
function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        // If no products match the search term, display a "Product not found" message
        displayNoResults();
    } else {
        // If there are matching products, display them
        displayProducts(filteredProducts);
    }
}

// Display "No products found" message
function displayNoResults() {
    productListContainer.innerHTML = `<p>No products found. Please try a different search.</p>`;
}

// Display products
function displayProducts(filteredProducts) {
    productListContainer.innerHTML = '';  // Clear current product list

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-product-id', product.id);

        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        
        // Add event listener to the "Add to Cart" button
        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product.id);
        });

        productListContainer.appendChild(productCard);
    });
}

// Event listener for search input
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    filterProducts(searchTerm);  // Filter products based on search term
});

// Initial display of all products
displayProducts(products);
