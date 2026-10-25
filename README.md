# Enterprise QA Automation & SDET Portfolio

[![Playwright Tests](https://img.shields.io/badge/Playwright-1.42+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Multi-Browser](https://img.shields.io/badge/Browsers-Chromium%20%7C%20Firefox%20%7C%20WebKit%20%7C%20Mobile-blue?style=for-the-badge)](https://playwright.dev/docs/browsers)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An enterprise-grade test automation showcase demonstrating **Software Development Engineer in Test (SDET)** capabilities. This repository contains **4 distinct, fully interactive, multi-screen web applications** (21 responsive screens in total) paired with a complete **Page Object Model (POM)** test automation framework written in **Playwright** and integrated with **GitHub Actions CI/CD**.

---

## 🌟 Executive Summary & Application Archetypes

Every application is engineered with real-world state management, localized assets, zero external layout dependencies, and deterministic `data-testid` contracts specifically tailored for robust, non-flaky test automation.

| Application | Domain | Key Business Workflows Tested | Screens |
| :--- | :--- | :--- | :---: |
| **[ShopTest](apps/shoptest/)** | E-Commerce & Retail | Product catalog search debouncing, faceted filtering, PDP state, promo coupon engine (`SAVE20` 20% discount), guest checkout flow, order tracking. | 5 Screens |
| **[AdminPro](apps/adminpro/)** | Enterprise Cloud SaaS & IAM | Executive KPI metrics, user management search/filtering, modal dialogs, RBAC security role assignments, SOC-2 audit logs. | 5 Screens |
| **[DemoBank](apps/demobank/)** | FinTech & Sovereign Banking | 256-bit secure gateway PIN login, FedNow instant wire transfers, ledger debit calculations, real-time credit card freeze/lock toggle. | 6 Screens |
| **[TripEase](apps/tripease/)** | Global Mobility & Travel | Flight route search, flexible date fare calendar matrix, interactive aircraft cabin seat map picker with surcharge computation, digital boarding pass & PNR. | 5 Screens |

---

## 🏛️ Test Architecture & Engineering Principles

### 1. Page Object Model (POM) Design
All UI selectors, interaction logic, and assertions are encapsulated within maintainable Page Objects inside [`pages/`](pages/):
- [`BasePage.js`](pages/BasePage.js): Core navigation, locator resolution, and network idle synchronization.
- [`ShopPage.js`](pages/ShopPage.js): E-commerce catalog, shopping cart operations, voucher application, and checkout fields.
- [`AdminPage.js`](pages/AdminPage.js): IAM user directory filtering, modal triggers, and role verification.
- [`BankPage.js`](pages/BankPage.js): Secure PIN authentication, transfer form handling, and card toggle state.
- [`TripPage.js`](pages/TripPage.js): Flight search parameterization, seat map interaction, and boarding pass verification.

### 2. Robust Test Selectors
To prevent test brittleness from layout or styling updates, test suites rely primarily on semantic `data-testid` attributes (e.g., `data-testid="btn-apply-promo"`, `data-testid="toggle-freeze-card"`, `data-testid="seat-14A"`).

### 3. High-Fidelity Local Assets
To eliminate network flakiness and rate limiting during continuous integration runs, all 38 high-resolution Unsplash assets are locally hosted in respective `images/` directories and documented in [`unsplash_manifest.json`](unsplash_manifest.json).

---

## 📁 Repository Structure

```text
Automation-qa-Portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD test automation pipeline
├── apps/
│   ├── adminpro/                  # AdminPro Enterprise SaaS Application
│   │   ├── images/                # Local verified photography assets
│   │   ├── index.html             # Overview & Analytics Dashboard
│   │   ├── users.html             # Identity Directory & User Management
│   │   ├── rbac.html              # Role-Based Access Control
│   │   ├── audit.html             # SOC-2 Compliance Audit Trail
│   │   └── settings.html          # System & API Configuration
│   ├── demobank/                  # DemoBank Sovereign FinTech Application
│   │   ├── images/                # Financial and security imagery
│   │   ├── index.html             # Treasury & Liquidity Overview
│   │   ├── login.html             # 256-Bit Hardware Security Gateway
│   │   ├── transfer.html          # FedNow Instant Wire & Transfer Form
│   │   ├── cards.html             # Virtual Cards & Freeze Security Controls
│   │   ├── deposit.html           # Mobile Check Deposit Simulator
│   │   └── transactions.html      # Real-Time Settlement Ledger
│   ├── shoptest/                  # ShopTest E-Commerce Storefront
│   │   ├── images/                # Lifestyle & product catalog photos
│   │   ├── index.html             # Storefront Catalog & Product Grid
│   │   ├── product-detail.html    # Single Product View (PDP)
│   │   ├── cart.html              # Cart & Promo Calculation Engine
│   │   ├── checkout.html          # Order Fulfillment & Payment Form
│   │   └── order-tracking.html    # Live Courier Tracking Timeline
│   └── tripease/                  # TripEase Mobility & Travel Booking
│       ├── images/                # Aviation & destination photography
│       ├── index.html             # Flight Search Engine
│       ├── results.html           # Fare Results Feed & Matrix
│       ├── seat-selection.html    # Aircraft Cabin Seat Picker
│       ├── booking.html           # Passenger Details & Add-ons
│       └── boarding-pass.html     # Electronic Boarding Pass & PNR
├── assets/
│   ├── css/
│   └── images/                    # Root portal preview cards
├── pages/                         # Page Object Model (POM) Classes
│   ├── BasePage.js
│   ├── ShopPage.js
│   ├── AdminPage.js
│   ├── BankPage.js
│   └── TripPage.js
├── tests/                         # Playwright Test Suites
│   ├── ecommerce/
│   │   └── ecommerce.spec.js
│   ├── admin/
│   │   └── admin.spec.js
│   ├── banking/
│   │   └── banking.spec.js
│   └── travel/
│       └── travel.spec.js
├── index.html                     # Central Portfolio Showcase Portal
├── package.json                   # NPM dependencies & test execution scripts
├── playwright.config.js           # Multi-browser & webServer configuration
├── unsplash_manifest.json         # Photography metadata & attribution registry
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [Git](https://git-scm.com/)

### 1. Clone & Install
```bash
git clone git@github.com:connectharshitjoshi/Automation-qa-Portfolio.git
cd Automation-qa-Portfolio
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

### 3. Launch the Local Application Server
To explore the applications manually in your browser:
```bash
npm start
```
Navigate to `http://localhost:3000` to access the central portfolio portal and launch any of the 4 applications.

---

## 🧪 Test Execution Commands

| Command | Description |
| :--- | :--- |
| `npm test` | Run all test suites across configured browsers in headless mode |
| `npm run test:ui` | Open Playwright's interactive visual UI Test Runner |
| `npm run test:headed` | Run tests with visible browser windows |
| `npm run test:chromium` | Execute tests strictly on Google Chromium |
| `npm run test:firefox` | Execute tests strictly on Mozilla Firefox |
| `npm run test:webkit` | Execute tests strictly on Apple WebKit (Safari engine) |
| `npm run test:report` | Serve and open the detailed HTML test execution report |

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The repository includes an automated continuous integration pipeline configured in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

On every push and pull request to `main`:
1. Checks out the code repository.
2. Configures Node.js runtime and caches dependencies.
3. Installs Playwright system browser binaries.
4. Executes the full end-to-end regression test suite.
5. Archives and publishes the Playwright HTML test report as an artifact.

---

## 👨‍💻 Author & Contact

**Harshit Joshi**  
QA Automation Engineer / SDET  
- GitHub: [@connectharshitjoshi](https://github.com/connectharshitjoshi)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
