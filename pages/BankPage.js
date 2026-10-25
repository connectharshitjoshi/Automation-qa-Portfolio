// @ts-check
const { BasePage } = require('./BasePage');

class BankPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Authentication Locators
    this.usernameInput = this.page.locator('#loginUsername, [data-testid~="login-username"]');
    this.pinInput = this.page.locator('#loginPin, [data-testid~="auth-pin-input"], [data-testid~="login-password"]');
    this.btnLoginSubmit = this.page.locator('#loginSubmitBtn, [data-testid~="login-submit-btn"], [data-testid~="auth-submit-btn"]');
    this.demoCredsHint = this.page.locator('[data-testid~="demo-creds-hint"]');

    // Navigation Locators
    this.navDashboard = this.page.locator('[data-testid="nav-dashboard"]');
    this.navTransfer = this.page.locator('[data-testid="nav-transfer"]');
    this.navDeposit = this.page.locator('[data-testid="nav-deposit"]');
    this.navCards = this.page.locator('[data-testid="nav-cards"]');
    this.navTransactions = this.page.locator('[data-testid="nav-transactions"]');

    // Dashboard & Metrics Locators
    this.checkingBalance = this.page.locator('#checkingBalance, #transferCheckingBal, [data-testid="checking-balance"]');
    this.savingsBalance = this.page.locator('#savingsBalance, #transferSavingsBal, [data-testid="savings-balance"]');

    // Transfer Locators
    this.transferFromSelect = this.page.locator('#fromAccountSelect, [data-testid~="transfer-from"]');
    this.transferToSelect = this.page.locator('#toRecipientSelect, [data-testid~="transfer-to"]');
    this.transferAmountInput = this.page.locator('#transferAmountInput, [data-testid~="transfer-amount"]');
    this.transferMemoInput = this.page.locator('#transferNoteInput, [data-testid~="transfer-memo"]');
    this.btnExecuteTransfer = this.page.locator('#btnExecuteTransfer, [data-testid~="btn-submit-transfer"], [data-testid~="btn-authorize-wire"]');
    this.wireConfirmedBanner = this.page.locator('#wire-confirmed-banner, [data-testid="wire-confirmed-banner"]');
    this.transferSuccessToast = this.page.locator('#transfer-success-toast, [data-testid="transfer-success-toast"]');

    // Card Management Locators
    this.toggleFreezeCard = this.page.locator('#toggleFreeze, [data-testid="toggle-freeze-card"]');
    this.cardFrozenTag = this.page.locator('#cardFrozenTag, [data-testid="card-frozen-tag"]');
    this.displayCardNumber = this.page.locator('#displayCardNum, [data-testid="display-card-number"]');
    this.btnRevealCard = this.page.locator('#btnRevealCard, [data-testid="btn-reveal-card"]');
  }

  /**
   * Navigate to bank login or app
   */
  async gotoLogin() {
    await this.navigate('/apps/demobank/login.html');
    await this.waitForLoad();
  }

  /**
   * Complete 256-bit secure gateway PIN authentication
   * @param {string} username
   * @param {string} pin
   */
  async login(username = 'john_doe', pin = '1234') {
    await this.usernameInput.fill(username);
    await this.pinInput.fill(pin);
    await this.btnLoginSubmit.click();
  }

  /**
   * Execute an instant account-to-account or wire transfer
   * @param {string} amount
   * @param {string} memo
   */
  async makeTransfer(amount = '150.00', memo = 'Automation verification wire') {
    await this.transferAmountInput.fill(amount);
    if (memo) {
      await this.transferMemoInput.fill(memo);
    }
    await this.btnExecuteTransfer.click();
  }

  /**
   * Toggle card freeze switch
   */
  async toggleCardFreeze() {
    await this.toggleFreezeCard.click();
  }
}

module.exports = { BankPage };
