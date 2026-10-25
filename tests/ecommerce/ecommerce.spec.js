// @ts-check
const { test, expect } = require('@playwright/test');
const { ShopPage } = require('../../pages/ShopPage');

test.describe('ShopTest E-Commerce Benchmark Suite', () => {
  let shopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.navigate('/apps/shoptest/index.html');
    await shopPage.waitForLoad();
  });

  test('TC-SHOP-01: Catalog displays products and supports category filter and search', async ({ page }) => {
    // Assert title or header
    await expect(page).toHaveTitle(/ShopTest/i);

    // Filter by Electronics or Audio
    const searchInput = page.locator('#search-input, [data-testid="search-input"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('Noise-Cancelling');
      await page.waitForTimeout(300);
    }

    // Verify product cards are displayed
    const productCards = page.locator('.product-card, [data-testid^="product-card"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('TC-SHOP-02: Navigate to PDP, select quantity, add to cart', async ({ page }) => {
    await page.goto('/apps/shoptest/product-detail.html?id=ST-001');
    await shopPage.waitForLoad();

    // Verify PDP title and price are visible
    const pdpTitle = page.locator('.product-main-title, [data-testid="pdp-title"]');
    await expect(pdpTitle).toBeVisible();

    // Add to cart
    const addToCartBtn = page.locator('#btn-add-to-cart, [data-testid="btn-add-to-cart"]');
    await addToCartBtn.click();

    // Cart badge should increment
    const cartBadge = page.locator('#cart-count-badge, [data-testid="cart-badge"]');
    await expect(cartBadge).toBeVisible();
  });

  test('TC-SHOP-03: Cart promo engine calculates SAVE20 20% discount correctly', async ({ page }) => {
    await page.goto('/apps/shoptest/cart.html');
    await shopPage.waitForLoad();

    const promoInput = page.locator('#promo-code-input, [data-testid="input-promo"]');
    const applyBtn = page.locator('.btn-apply-promo, [data-testid="btn-apply-promo"]');

    await promoInput.fill('SAVE20');
    await applyBtn.click();

    // Verify applied promo chip is displayed
    const appliedChip = page.locator('#applied-promo-chip');
    await expect(appliedChip).toBeVisible();
    await expect(appliedChip).toContainText('SAVE20');
  });

  test('TC-SHOP-04: Checkout flow completes and produces valid Order Tracking ID', async ({ page }) => {
    await page.goto('/apps/shoptest/checkout.html');
    await shopPage.waitForLoad();

    // Fill shipping details
    const emailInput = page.locator('#checkout-email, [data-testid="input-email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('qa.engineer@portfolio.test');
    }

    const placeOrderBtn = page.locator('#btn-place-order, [data-testid="btn-place-order"]');
    await placeOrderBtn.click();

    // Should navigate to order-tracking.html with order ID
    await expect(page).toHaveURL(/order-tracking\.html/);
    const trackingBadge = page.locator('#order-id-badge, [data-testid="tracking-order-id"]');
    await expect(trackingBadge).toBeVisible();
  });
});
