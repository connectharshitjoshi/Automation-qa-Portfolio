// @ts-check

/**
 * Base Page Object Model Class
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a relative path
   * @param {string} path
   */
  async navigate(path) {
    await this.page.goto(path);
  }

  /**
   * Get element by data-testid
   * @param {string} testId
   */
  getByTestId(testId) {
    return this.page.getByTestId(testId);
  }

  /**
   * Wait for network idle or DOM content loaded
   */
  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { BasePage };
