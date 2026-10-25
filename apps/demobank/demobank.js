// ====================================================
// DemoBank Core State Engine & Automation Fixture
// ====================================================

const DEMOBANK_STORAGE_KEY = "demobank_state";

const DEFAULT_BANK_STATE = {
  isLoggedIn: true,
  user: {
    name: "John Doe",
    username: "john_doe",
    tier: "Tier 1 Premier",
    clientNumber: "#4910-88",
    email: "john.doe@privateclient.demobank.com"
  },
  accounts: {
    checking: {
      accountNumber: "4829",
      fullNumber: "12200049-4829",
      name: "Checking Account",
      balance: 5420.50,
      routing: "12200049"
    },
    savings: {
      accountNumber: "9104",
      fullNumber: "12200049-9104",
      name: "High-Yield Savings",
      balance: 18250.00,
      apy: "4.50%",
      interestYTD: 412.30
    }
  },
  limits: {
    dailyAchTotal: 25000.00,
    dailyAchUsed: 3750.00,
    dailyDepositQuota: 10000.00,
    dailyDepositRemaining: 10000.00
  },
  cards: [
    {
      id: "card-4829",
      type: "Platinum Visa Debit",
      number: "4829 8812 9014 4829",
      last4: "4829",
      exp: "09/29",
      cvv: "492",
      isFrozen: false,
      dailyLimit: 5000.00,
      intlAllowed: true
    },
    {
      id: "card-9104",
      type: "DemoBank Sapphire Credit",
      number: "5412 7519 2240 9104",
      last4: "9104",
      exp: "12/28",
      cvv: "818",
      isFrozen: false,
      dailyLimit: 15000.00,
      intlAllowed: true
    }
  ],
  transfers: [
    { id: "TX-91024-FED", timestamp: "Today, 2:14 PM", recipient: "Alice Cooper (**** 1122)", amount: -150.00, status: "Cleared", channel: "FedNOW Instant" },
    { id: "TX-88392-INT", timestamp: "Yesterday, 9:30 AM", recipient: "Internal: Savings → Checking", amount: 1000.00, status: "Cleared", channel: "Intra-Account" },
    { id: "TX-77401-BIL", timestamp: "Oct 24, 2025", recipient: "Electric Utility Co (Monthly Power)", amount: -124.60, status: "Cleared", channel: "Direct Bill Pay" }
  ],
  deposits: [
    { id: "DEP-88391", date: "Today, 02:45 PM", channel: "Instant Test Credit", account: "Checking (**** 4829)", amount: 500.00, status: "Instant Credit" },
    { id: "CHK-10924", date: "Yesterday, 10:12 AM", channel: "Mobile Check #1041", account: "Savings (**** 9104)", amount: 1250.00, status: "Cleared ($500 Adv)" },
    { id: "CHK-10923", date: "Oct 23, 04:19 PM", channel: "Mobile Check #0893", account: "Checking (**** 4829)", amount: 750.00, status: "Cleared" },
    { id: "DEP-88310", date: "Oct 22, 11:30 AM", channel: "Instant Test Credit", account: "Savings (**** 9104)", amount: 2000.00, status: "Instant Credit" }
  ],
  transactions: [
    { id: "TXN-9024", date: "Today, 02:45 PM", desc: "Instant Test Credit Deposit", type: "credit", amount: 500.00, account: "Checking", status: "Cleared / FedNow" },
    { id: "TXN-9023", date: "Today, 02:14 PM", desc: "P2P Instant Send - Alice Cooper", type: "debit", amount: 150.00, account: "Checking", status: "Cleared / FedNow" },
    { id: "TXN-9022", date: "Yesterday, 10:12 AM", desc: "Mobile Check Deposit #1041", type: "credit", amount: 1250.00, account: "Savings", status: "Cleared" },
    { id: "TXN-9021", date: "Yesterday, 09:30 AM", desc: "Internal Account Transfer from Savings", type: "credit", amount: 1000.00, account: "Checking", status: "Cleared" },
    { id: "TXN-9020", date: "Oct 24, 2025", desc: "Electric Utility Co Auto-Pay #9021-X", type: "debit", amount: 124.60, account: "Checking", status: "Cleared" },
    { id: "TXN-9019", date: "Oct 23, 2025", desc: "Whole Foods Market - Organic Groceries", type: "debit", amount: 84.20, account: "Checking", status: "Cleared" },
    { id: "TXN-9018", date: "Oct 22, 2025", desc: "Payroll Direct Deposit - Tech Corp", type: "credit", amount: 3200.00, account: "Checking", status: "Cleared" }
  ]
};

// Retrieve State
function getBankState() {
  try {
    const raw = localStorage.getItem(DEMOBANK_STORAGE_KEY);
    if (!raw) {
      saveBankState(DEFAULT_BANK_STATE);
      return JSON.parse(JSON.stringify(DEFAULT_BANK_STATE));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Storage fallback triggered:", e);
    return JSON.parse(JSON.stringify(DEFAULT_BANK_STATE));
  }
}

// Save State
function saveBankState(state) {
  try {
    localStorage.setItem(DEMOBANK_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Storage write failed:", e);
  }
}

// Format Currency
function formatUSD(num) {
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Toast Notifications
function showBankToast(message, type = "success") {
  let toast = document.getElementById("bank-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "bank-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f172a;
      color: #ffffff;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      z-index: 9999;
      display: none;
      animation: fadeIn 0.2s ease-out;
      border-left: 4px solid #10b981;
    `;
    document.body.appendChild(toast);
  }

  if (type === "error") {
    toast.style.borderLeftColor = "#ef4444";
  } else if (type === "warning") {
    toast.style.borderLeftColor = "#f59e0b";
  } else {
    toast.style.borderLeftColor = "#10b981";
  }

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

// Reset / Seed for Automated Testing
window.resetBankState = function() {
  saveBankState(DEFAULT_BANK_STATE);
  showBankToast("DemoBank test fixture restored to baseline balances.");
};
