// ====================================================
// ShopTest Shared State & Automation Engine
// ====================================================

const DEFAULT_CART = [
  {
    id: "item-aud-8821",
    sku: "ST-AUD-8821",
    title: "Aura Studio Pro ANC Headphones",
    color: "Matte Black",
    package: "Standard Edition",
    unitPrice: 189.00,
    quantity: 1,
    inStock: true,
    icon: "🎧",
    img: "images/prod-headphones.jpg"
  },
  {
    id: "item-acc-4029",
    sku: "ST-ACC-4029",
    title: "Minimalist Aluminum Desk Stand",
    color: "Space Gray",
    package: "CNC Billet",
    unitPrice: 45.00,
    quantity: 1,
    inStock: true,
    icon: "🖥️",
    img: "images/prod-stand.jpg"
  },
  {
    id: "item-cbl-1104",
    sku: "ST-CBL-1104",
    title: "Braided High-Speed Audio Cable (2m)",
    color: "24K Gold Plated",
    package: "1.8m Length",
    unitPrice: 14.00,
    quantity: 1,
    inStock: true,
    icon: "🔌",
    img: "images/prod-cable.jpg"
  }
];

// Product Catalog Fixtures
const CATALOG_PRODUCTS = [
  {
    id: "prod-1",
    sku: "ST-AUD-8821",
    title: "Aura Studio Active Noise-Cancelling Headphones",
    category: "Audio & Acoustics",
    categoryKey: "audio",
    rating: 4.8,
    reviewsCount: 142,
    price: 189.00,
    originalPrice: 229.00,
    badge: "Bestseller",
    badgeType: "bestseller",
    stockStatus: "IN STOCK",
    inStock: true,
    brand: "ShopTest Studio",
    img: "images/prod-headphones.jpg",
    pdpLink: "product-detail.html"
  },
  {
    id: "prod-2",
    sku: "ST-SMT-5510",
    title: "Halo Smart Ambience Desk Lamp Pro",
    category: "Smart Home",
    categoryKey: "smarthome",
    rating: 4.9,
    reviewsCount: 89,
    price: 129.00,
    originalPrice: 160.00,
    badge: "20% OFF",
    badgeType: "discount",
    stockStatus: "IN STOCK",
    inStock: true,
    brand: "Anker Labs",
    img: "images/prod-lamp.jpg",
    pdpLink: "product-detail.html"
  },
  {
    id: "prod-3",
    sku: "ST-APP-9214",
    title: "Heavyweight Structured French Terry Crewneck",
    category: "Minimal Apparel",
    categoryKey: "apparel",
    rating: 4.6,
    reviewsCount: 64,
    price: 64.00,
    originalPrice: 80.00,
    badge: "New",
    badgeType: "new",
    stockStatus: "IN STOCK",
    inStock: true,
    brand: "ShopTest Studio",
    img: "images/prod-crewneck.jpg",
    pdpLink: "product-detail.html"
  },
  {
    id: "prod-4",
    sku: "ST-WKS-7811",
    title: "Apex 20L Modular Tech Travel Backpack",
    category: "Workspace Hub",
    categoryKey: "workspace",
    rating: 4.9,
    reviewsCount: 230,
    price: 210.00,
    originalPrice: 240.00,
    badge: "Low Stock (2 left)",
    badgeType: "low-stock",
    stockStatus: "2 LEFT",
    inStock: true,
    brand: "Peak Design",
    img: "images/prod-backpack.jpg",
    pdpLink: "product-detail.html"
  },
  {
    id: "prod-5",
    sku: "ST-AUD-3109",
    title: "Vortex 360 Rugged Waterproof Smart Speaker",
    category: "Audio & Acoustics",
    categoryKey: "audio",
    rating: 4.7,
    reviewsCount: 118,
    price: 79.00,
    originalPrice: 99.00,
    badge: "Bestseller",
    badgeType: "bestseller",
    stockStatus: "IN STOCK",
    inStock: true,
    brand: "Sony Audio",
    img: "images/prod-speaker.jpg",
    pdpLink: "product-detail.html"
  },
  {
    id: "prod-6",
    sku: "ST-WKS-4420",
    title: "Chroma 75 Custom Mechanical Keyboard",
    category: "Workspace Hub",
    categoryKey: "workspace",
    rating: 4.8,
    reviewsCount: 312,
    price: 145.00,
    originalPrice: 180.00,
    badge: "Popular",
    badgeType: "popular",
    stockStatus: "IN STOCK",
    inStock: true,
    brand: "ShopTest Studio",
    img: "images/prod-keyboard.jpg",
    pdpLink: "product-detail.html"
  }
];

// Initialize State
function getStoredCart() {
  const raw = localStorage.getItem("shoptest_cart");
  if (!raw) {
    localStorage.setItem("shoptest_cart", JSON.stringify(DEFAULT_CART));
    return DEFAULT_CART;
  }
  try {
    const cart = JSON.parse(raw);
    let changed = false;
    cart.forEach(item => {
      if (item.img && item.img.startsWith("http")) {
        if (item.sku === "ST-AUD-8821") item.img = "images/prod-headphones.jpg";
        else if (item.sku === "ST-ACC-4029") item.img = "images/prod-stand.jpg";
        else if (item.sku === "ST-CBL-1104") item.img = "images/prod-cable.jpg";
        else item.img = "images/prod-headphones.jpg";
        changed = true;
      }
    });
    if (changed) localStorage.setItem("shoptest_cart", JSON.stringify(cart));
    return cart;
  } catch (e) {
    return DEFAULT_CART;
  }
}

function saveCart(cart) {
  localStorage.setItem("shoptest_cart", JSON.stringify(cart));
  updateNavCartBadge();
}

function getStoredPromo() {
  return localStorage.getItem("shoptest_promo") || "SAVE20";
}

function setStoredPromo(promo) {
  if (promo) {
    localStorage.setItem("shoptest_promo", promo);
  } else {
    localStorage.removeItem("shoptest_promo");
  }
}

function getStoredShippingMethod() {
  return localStorage.getItem("shoptest_shipping") || "ground";
}

function setStoredShippingMethod(method) {
  localStorage.setItem("shoptest_shipping", method);
}

// Calculate Totals Helper
function calculateTotals(cart, promoCode, shippingMethod) {
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  
  let discount = 0;
  let promoValid = false;
  let promoLabel = "";

  if (promoCode === "SAVE20") {
    discount = subtotal * 0.20;
    promoValid = true;
    promoLabel = "SAVE20 (20% OFF)";
  } else if (promoCode === "FREESHIP") {
    promoValid = true;
    promoLabel = "FREESHIP (FREE SHIPPING)";
  }

  let shippingCost = shippingMethod === "express" ? 15.00 : 9.99;
  if (promoCode === "FREESHIP" || subtotal >= 260.00) {
    shippingCost = 0.00;
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.0825; // 8.25%
  const total = taxableAmount + shippingCost + tax;

  return {
    subtotal,
    discount,
    promoValid,
    promoLabel,
    shippingCost,
    tax,
    total
  };
}

// Global Nav Cart Badge Update
function updateNavCartBadge() {
  const cart = getStoredCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);

  const badgeEls = document.querySelectorAll("[data-testid='nav-cart-badge']");
  badgeEls.forEach(el => {
    el.textContent = count;
  });

  const totalEls = document.querySelectorAll("[data-testid='nav-cart-total']");
  totalEls.forEach(el => {
    el.textContent = `$${subtotal.toFixed(2)}`;
  });
}

// Reset Fixture Utility
window.resetShopTestFixture = function() {
  localStorage.setItem("shoptest_cart", JSON.stringify(DEFAULT_CART));
  localStorage.setItem("shoptest_promo", "SAVE20");
  localStorage.setItem("shoptest_shipping", "ground");
  localStorage.removeItem("shoptest_latest_order");
  location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  updateNavCartBadge();
  const resetBtn = document.querySelector("[data-testid='btn-reset-fixture']");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetShopTestFixture);
  }
});
