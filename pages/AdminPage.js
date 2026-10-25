// @ts-check
const { BasePage } = require('./BasePage');

class AdminPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Nav Locators
    this.navOverview = this.page.getByTestId('nav-tab-overview');
    this.navUsers = this.page.getByTestId('nav-tab-users');
    this.navRbac = this.page.getByTestId('nav-tab-rbac');
    this.navAudit = this.page.getByTestId('nav-tab-audit');
    this.navSettings = this.page.getByTestId('nav-tab-settings');

    // Users Directory Locators
    this.inputSearchUsers = this.page.getByTestId('input-search-users');
    this.selectRoleFilter = this.page.getByTestId('select-role-filter');
    this.selectStatusFilter = this.page.getByTestId('select-status-filter');
    this.selectDeptFilter = this.page.getByTestId('select-dept-filter');
    this.btnResetFilters = this.page.getByTestId('btn-reset-filters');
    this.btnInviteUser = this.page.getByTestId('btn-invite-user');
    this.usersTable = this.page.getByTestId('users-table');
    this.usersTbody = this.page.getByTestId('users-tbody');

    // Invite Modal Locators
    this.inputInvName = this.page.getByTestId('input-inv-name');
    this.inputInvEmail = this.page.getByTestId('input-inv-email');
    this.selectInvRole = this.page.getByTestId('select-inv-role');
    this.selectInvDept = this.page.getByTestId('select-inv-dept');
    this.btnSubmitInvite = this.page.getByTestId('btn-submit-invite');

    // Telemetry & KPI Locators
    this.kpiTotalUsers = this.page.getByTestId('kpi-total-users');
    this.kpiActiveTenants = this.page.getByTestId('kpi-active-tenants');
  }

  async openOverview() {
    await this.navigate('/apps/adminpro/index.html');
  }

  async openUsers() {
    await this.navigate('/apps/adminpro/users.html');
  }

  async openRbac() {
    await this.navigate('/apps/adminpro/rbac.html');
  }

  async openAudit() {
    await this.navigate('/apps/adminpro/audit.html');
  }

  async openSettings() {
    await this.navigate('/apps/adminpro/settings.html');
  }

  /**
   * Search users by keyword
   * @param {string} query
   */
  async searchUser(query) {
    await this.inputSearchUsers.fill(query);
  }

  /**
   * Filter users by role
   * @param {string} role
   */
  async filterByRole(role) {
    await this.selectRoleFilter.selectOption(role);
  }

  /**
   * Submit new user invite
   * @param {string} name
   * @param {string} email
   * @param {string} role
   */
  async inviteUser(name, email, role) {
    await this.btnInviteUser.click();
    await this.inputInvName.fill(name);
    await this.inputInvEmail.fill(email);
    await this.selectInvRole.selectOption(role);
    await this.btnSubmitInvite.click();
  }
}

module.exports = { AdminPage };
