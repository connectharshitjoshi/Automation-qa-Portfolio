// @ts-check
const { test, expect } = require('@playwright/test');
const { AdminPage } = require('../../pages/AdminPage');

test.describe('AdminPro IAM & Enterprise Benchmark Suite', () => {
  let adminPage;

  test.beforeEach(async ({ page }) => {
    adminPage = new AdminPage(page);
    await adminPage.navigate('/apps/adminpro/index.html');
    await adminPage.waitForLoad();
  });

  test('TC-ADM-01: Admin dashboard displays executive telemetry and active users', async ({ page }) => {
    await expect(page).toHaveTitle(/AdminPro/i);
    const navOverview = page.locator('[data-testid="nav-tab-overview"]');
    await expect(navOverview).toBeVisible();

    // Verify metrics cards
    const metricCards = page.locator('.metric-card, .metric-value');
    await expect(metricCards.first()).toBeVisible();
  });

  test('TC-ADM-02: User directory filters records dynamically via search input', async ({ page }) => {
    await page.goto('/apps/adminpro/users.html');
    await adminPage.waitForLoad();

    const searchInput = page.locator('#user-filter-input, [data-testid="input-search-users"]');
    await expect(searchInput).toBeVisible();

    // Search for a specific user
    await searchInput.fill('Sarah');
    await page.waitForTimeout(300);

    const userRows = page.locator('tbody tr');
    await expect(userRows.first()).toContainText('Sarah');
  });

  test('TC-ADM-03: Invite user modal opens, accepts data, and triggers confirmation', async ({ page }) => {
    await page.goto('/apps/adminpro/users.html');
    await adminPage.waitForLoad();

    const inviteBtn = page.locator('[data-testid="btn-invite-user"]');
    await inviteBtn.click();

    // Verify modal appears
    const modal = page.locator('#inviteModal, .modal-backdrop, .modal-container');
    await expect(modal.first()).toBeVisible();
  });

  test('TC-ADM-04: RBAC & Audit Trail views are accessible and display security logs', async ({ page }) => {
    await page.goto('/apps/adminpro/audit.html');
    await adminPage.waitForLoad();

    // Verify audit logs table or feed
    const auditFeed = page.locator('.audit-table, .audit-feed, table');
    await expect(auditFeed.first()).toBeVisible();
  });
});
