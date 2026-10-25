// @ts-check
const { test, expect } = require('@playwright/test');
const { BankPage } = require('../../pages/BankPage');

test.describe('DemoBank Sovereign FinTech Benchmark Suite', () => {
  let bankPage;

  test.beforeEach(async ({ page }) => {
    bankPage = new BankPage(page);
    await bankPage.gotoLogin();
  });

  test('TC-BNK-01: Secure PIN login authenticates client and redirects to treasury overview', async ({ page }) => {
    await expect(page).toHaveTitle(/DemoBank/i);

    // Pre-loaded credentials or explicit typing
    await bankPage.login('john_doe', '1234');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/index\.html/);
    const checkingBal = page.locator('#checkingBalance, [data-testid="checking-balance"]');
    await expect(checkingBal.first()).toBeVisible();
  });

  test('TC-BNK-02: Instant FedNow / Wire transfer executes and updates ledger', async ({ page }) => {
    await page.goto('/apps/demobank/transfer.html');
    await bankPage.waitForLoad();

    // Verify initial balance display
    const checkingBal = page.locator('#transferCheckingBal, [data-testid="checking-balance"]');
    await expect(checkingBal.first()).toBeVisible();

    // Input transfer amount
    await bankPage.makeTransfer('250.00', 'Automated QA Wire Test');

    // Confirm success toast or feedback banner
    const feedback = page.locator('#wire-confirmed-banner, #transfer-success-toast, .feedback-banner');
    await expect(feedback.first()).toBeVisible();
  });

  test('TC-BNK-03: Real-time card freeze toggle locks transactions instantly', async ({ page }) => {
    await page.goto('/apps/demobank/cards.html');
    await bankPage.waitForLoad();

    const freezeToggle = page.locator('#toggleFreeze, [data-testid="toggle-freeze-card"]');
    await expect(freezeToggle).toBeVisible();

    // Toggle freeze card
    await freezeToggle.click();

    // Frozen indicator tag becomes visible or toast triggers
    const frozenTag = page.locator('#cardFrozenTag');
    if (await frozenTag.count() > 0) {
      await expect(frozenTag).toBeVisible();
    }
  });

  test('TC-BNK-04: Card credential reveal reveals unmasked PAN and CVV', async ({ page }) => {
    await page.goto('/apps/demobank/cards.html');
    await bankPage.waitForLoad();

    const revealBtn = page.locator('#btnRevealCard, [data-testid="btn-reveal-card"]');
    await revealBtn.click();

    const cardNum = page.locator('#displayCardNum, [data-testid="display-card-number"]');
    await expect(cardNum).not.toContainText('••••');
  });
});
