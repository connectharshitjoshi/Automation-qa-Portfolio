// @ts-check
const { BasePage } = require('./BasePage');

class ShopPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Navigation & Catalog Locators
    this.navCatalog = this.page.getByTestId('nav-tab-catalog');
    this.navPdp = this.page.getByTestId('nav-tab-pdp');
    this.navCart = this.page.getByTestId('nav-tab-cart');
    this.navCartBadge = this.page.getByTestId('nav-cart-badge');
    this.searchInput = this.page.getByTestId('search-input');
    this.categoryFilter = this.page.getByTestId('category-filter');
    this.productsGrid = this.page.getByTestId('products-grid');

    // PDP Locators
    this.pdpMainImage = this.page.getByTestId('pdp-main-image');
    this.pdpTitle = this.page.getByTestId('pdp-title');
    this.pdpSku = this.page.getByTestId('pdp-sku');
    this.pdpPrice = this.page.getByTestId('pdp-price');
    this.btnAddToCart = this.page.getByTestId('btn-add-to-cart');
    this.qtyInput = this.page.getByTestId('qty-input');

    // Cart & Promo Engine Locators
    this.cartItemsList = this.page.getByTestId('cart-items-list');
    this.promoInput = this.page.getByTestId('promo-input');
    this.btnApplyPromo = this.page.getByTestId('btn-apply-promo');
    this.promoSuccessBanner = this.page.getByTestId('promo-success-banner');
    this.cartSubtotal = this.page.getByTestId('cart-subtotal');
    this.cartDiscount = this.page.getByTestId('cart-discount');
    this.cartTotal = this.page.getByTestId('cart-total');
    this.btnProceedCheckout = this.page.getByTestId('btn-proceed-checkout');

    // Checkout Flow Locators
    this.inputEmail = this.page.getByTestId('input-email');
    this.inputFirstName = this.page.getByTestId('input-first-name');
    this.inputLastName = this.page.getByTestId('input-last-name');
    this.inputAddress = this.page.getByTestId('input-address');
    this.inputCity = this.page.getByTestId('input-city');
    this.inputZip = this.page.getByTestId('input-zip');
    this.inputCardNumber = this.page.getByTestId('input-card-number');
    this.inputCardExp = this.page.getByTestId('input-card-exp');
    this.inputCardCvv = this.page.getByTestId('input-card-cvv');
    this.btnPlaceOrder = this.page.getByTestId('btn-place-order');

    // Tracking Locators
    this.orderIdBadge = this.page.getByTestId('order-id-badge');
    this.orderTrackingTimeline = this.page.getByTestId('tracking-timeline');
  }

  async openCatalog() {
    await this.navigate('/apps/shoptest/index.html');
  }

  async openPdp() {
    await this.navigate('/apps/shoptest/product-detail.html');
  }

  async openCart() {
    await this.navigate('/apps/shoptest/cart.html');
  }

  async openCheckout() {
    await this.navigate('/apps/shoptest/checkout.html');
  }

  async openTracking() {
    await this.navigate('/apps/shoptest/order-tracking.html');
  }

  /**
   * Apply promo code
   * @param {string} code
   */
  async applyPromoCode(code) {
    await this.promoInput.fill(code);
    await this.btnApplyPromo.click();
  }
}

module.exports = { ShopPage };
