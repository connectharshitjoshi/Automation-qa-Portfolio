// Mock Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    title: "UltraBook Pro 15",
    category: "Electronics",
    price: 1199.99,
    description: "High-performance laptop featuring next-gen multi-core processor and retina display.",
    icon: "💻"
  },
  {
    id: 2,
    title: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 249.99,
    description: "Studio-grade wireless over-ear headphones with active noise cancellation and 30hr battery.",
    icon: "🎧"
  },
  {
    id: 3,
    title: "Smart Sports Watch 5",
    category: "Electronics",
    price: 189.50,
    description: "Water-resistant fitness tracker with heart rate monitor, GPS, and sleep analysis.",
    icon: "⌚"
  },
  {
    id: 4,
    title: "Aerodynamic Running Shoes",
    category: "Footwear",
    price: 129.00,
    description: "Breathable lightweight running trainers engineered for speed and maximum cushion.",
    icon: "👟"
  },
  {
    id: 5,
    title: "Trail Hiking Boots",
    category: "Footwear",
    price: 159.95,
    description: "Rugged waterproof leather boots designed for rough trails and heavy weather.",
    icon: "🥾"
  },
  {
    id: 6,
    title: "Urban Commuter Backpack",
    category: "Accessories",
    price: 79.99,
    description: "Waterproof backpack with dedicated laptop sleeve, USB pass-through, and anti-theft zipper.",
    icon: "🎒"
  },
  {
    id: 7,
    title: "Polarized Aviator Sunglasses",
    category: "Accessories",
    price: 49.99,
    description: "Classic UV400 protective polarized lenses in a lightweight stainless steel frame.",
    icon: "🕶️"
  },
  {
    id: 8,
    title: "Precision Espresso Maker",
    category: "Home",
    price: 299.00,
    description: "15-bar Italian pump espresso machine with manual milk frother steam wand.",
    icon: "☕"
  }
];

// App State
let cart = [];
let discountMultiplier = 0; // 0.1 for 10%
const VALID_PROMOS = {
  "SAVE10": 0.10,
  "SUPER20": 0.20
};

// DOM References
const productsGrid = document.getElementById("products-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const productCount = document.getElementById("product-count");

const cartBtn = document.getElementById("cart-btn");
const cartBadge = document.getElementById("cart-badge");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const drawerItemCount = document.getElementById("drawer-item-count");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const discountRow = document.getElementById("discount-row");
const cartDiscountEl = document.getElementById("cart-discount");
const cartTotalEl = document.getElementById("cart-total");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const promoMsg = document.getElementById("promo-msg");
const checkoutBtn = document.getElementById("checkout-btn");

const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutBtn = document.getElementById("close-checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
const checkoutError = document.getElementById("checkout-error");
const modalOrderTotal = document.getElementById("modal-order-total");

const confirmationModal = document.getElementById("confirmation-modal");
const confOrderId = document.getElementById("conf-order-id");
const confTotalPaid = document.getElementById("conf-total-paid");
const confCustName = document.getElementById("conf-cust-name");
const continueShoppingBtn = document.getElementById("continue-shopping-btn");

// Initial Render
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filtered = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                          product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  productCount.textContent = `Showing ${filtered.length} items`;
  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-testid", "product-card");
    card.setAttribute("data-product-id", item.id);

    card.innerHTML = `
      <div class="card-img-placeholder">${item.icon}</div>
      <div class="card-body">
        <span class="card-category" data-testid="product-category">${item.category}</span>
        <h4 class="card-title" data-testid="product-title">${item.title}</h4>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer">
          <span class="card-price" data-testid="product-price">$${item.price.toFixed(2)}</span>
          <button class="btn-add-cart" data-testid="add-to-cart-btn" onclick="addToCart(${item.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Cart Operations
window.addToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  // Feedback animation on cart button
  cartBtn.style.transform = "scale(1.1)";
  setTimeout(() => { cartBtn.style.transform = "scale(1)"; }, 200);
};

window.changeQuantity = function(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  updateCartUI();
};

window.removeFromCart = function(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
};

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalCount;
  drawerItemCount.textContent = totalCount;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    cartSubtotalEl.textContent = "$0.00";
    cartTotalEl.textContent = "$0.00";
    discountRow.style.display = "none";
    return;
  }

  checkoutBtn.disabled = false;

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.setAttribute("data-testid", "cart-item");
    itemEl.innerHTML = `
      <div class="item-icon">${item.icon}</div>
      <div class="item-details">
        <div class="item-title" data-testid="cart-item-title">${item.title}</div>
        <div class="item-price">$${item.price.toFixed(2)} &times; ${item.quantity}</div>
      </div>
      <div class="qty-controls">
        <button class="btn-qty" data-testid="btn-decrease" onclick="changeQuantity(${item.id}, -1)">-</button>
        <span class="qty-number" data-testid="item-quantity">${item.quantity}</span>
        <button class="btn-qty" data-testid="btn-increase" onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <button class="btn-remove" data-testid="btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">✕</button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  const discountAmount = subtotal * discountMultiplier;
  const finalTotal = subtotal - discountAmount;

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (discountMultiplier > 0) {
    discountRow.style.display = "flex";
    cartDiscountEl.textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    discountRow.style.display = "none";
  }
  cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;
  modalOrderTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

// Promo Code Handler
promoBtn.addEventListener("click", () => {
  const code = promoInput.value.trim().toUpperCase();
  if (VALID_PROMOS[code]) {
    discountMultiplier = VALID_PROMOS[code];
    promoMsg.className = "promo-msg success";
    promoMsg.textContent = `Promo code applied: ${discountMultiplier * 100}% off!`;
    promoMsg.style.display = "block";
    updateCartUI();
  } else {
    discountMultiplier = 0;
    promoMsg.className = "promo-msg error";
    promoMsg.textContent = "Invalid promo code. Try SAVE10";
    promoMsg.style.display = "block";
    updateCartUI();
  }
});

// Modal Open/Close Controls
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

checkoutBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
  checkoutModal.style.display = "flex";
});

closeCheckoutBtn.addEventListener("click", () => {
  checkoutModal.style.display = "none";
});

// Checkout Form Submission
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutError.style.display = "none";

  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const address = document.getElementById("cust-address").value.trim();
  const card = document.getElementById("cust-card").value.trim();

  if (!name || !email || !address || !card) {
    checkoutError.textContent = "Please fill in all required fields.";
    checkoutError.style.display = "block";
    return;
  }

  if (card.length < 8) {
    checkoutError.textContent = "Please enter a valid card number.";
    checkoutError.style.display = "block";
    return;
  }

  // Generate simulated order
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  confOrderId.textContent = orderId;
  confCustName.textContent = name;
  confTotalPaid.textContent = modalOrderTotal.textContent;

  // Reset form & cart
  checkoutForm.reset();
  cart = [];
  discountMultiplier = 0;
  promoInput.value = "";
  promoMsg.style.display = "none";
  updateCartUI();

  checkoutModal.style.display = "none";
  confirmationModal.style.display = "flex";
});

continueShoppingBtn.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

// Search & Filter Listeners
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

// Initial call
renderProducts();
