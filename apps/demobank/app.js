// Bank State
let state = {
  isLoggedIn: false,
  currentUser: "Jordan Vance",
  checkingBalance: 5420.50,
  savingsBalance: 18250.00,
  transactions: [
    { id: "TXN-9021", desc: "Payroll Direct Deposit - Tech Corp", type: "credit", amount: 3200.00, date: "Oct 24, 2026", category: "Salary" },
    { id: "TXN-9020", desc: "Whole Foods Market", type: "debit", amount: 84.20, date: "Oct 23, 2026", category: "Groceries" },
    { id: "TXN-9019", desc: "Electric Utility Co Auto-Pay", type: "debit", amount: 145.00, date: "Oct 21, 2026", category: "Utilities" },
    { id: "TXN-9018", desc: "Zelle Transfer from Marcus", type: "credit", amount: 65.00, date: "Oct 19, 2026", category: "Transfer" },
    { id: "TXN-9017", desc: "Coffee & Bakery", type: "debit", amount: 12.50, date: "Oct 18, 2026", category: "Dining" }
  ]
};

// DOM References
const authView = document.getElementById("auth-view");
const dashboardView = document.getElementById("dashboard-view");
const userNav = document.getElementById("user-nav");
const btnLogout = document.getElementById("btn-logout");

const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

const checkingBalanceEl = document.getElementById("checking-balance");
const savingsBalanceEl = document.getElementById("savings-balance");
const totalNetWorthEl = document.getElementById("total-net-worth");

const transferForm = document.getElementById("transfer-form");
const transferFrom = document.getElementById("transfer-from");
const transferTo = document.getElementById("transfer-to");
const transferAmount = document.getElementById("transfer-amount");
const transferMemo = document.getElementById("transfer-memo");
const transferFeedback = document.getElementById("transfer-feedback");

const transactionsList = document.getElementById("transactions-list");
const searchTxn = document.getElementById("search-txn");
const filterTxnType = document.getElementById("filter-txn-type");

// Number Formatter
function formatMoney(amount) {
  return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Update Dashboard Numbers
function updateBalances() {
  checkingBalanceEl.textContent = formatMoney(state.checkingBalance);
  savingsBalanceEl.textContent = formatMoney(state.savingsBalance);
  const total = state.checkingBalance + state.savingsBalance;
  totalNetWorthEl.textContent = formatMoney(total);
}

// Render Transactions List
function renderTransactions() {
  const query = searchTxn.value.toLowerCase().trim();
  const filterType = filterTxnType.value;

  const filtered = state.transactions.filter(t => {
    const matchesSearch = t.desc.toLowerCase().includes(query) || t.id.toLowerCase().includes(query);
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  transactionsList.innerHTML = "";

  if (filtered.length === 0) {
    transactionsList.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2rem;">No matching transactions found.</div>`;
    return;
  }

  filtered.forEach(txn => {
    const item = document.createElement("div");
    item.className = "txn-item";
    item.setAttribute("data-testid", "txn-row");
    item.setAttribute("data-txn-id", txn.id);

    const isCredit = txn.type === "credit";
    const sign = isCredit ? "+" : "-";

    item.innerHTML = `
      <div class="txn-left">
        <div class="txn-icon ${txn.type}">
          ${isCredit ? "↓" : "↑"}
        </div>
        <div>
          <div class="txn-desc" data-testid="txn-desc">${txn.desc}</div>
          <div class="txn-meta">${txn.date} &bull; ${txn.category}</div>
        </div>
      </div>
      <div class="txn-right">
        <div class="txn-amount ${txn.type}" data-testid="txn-amount">
          ${sign}${formatMoney(txn.amount)}
        </div>
        <div class="txn-badge" data-testid="txn-status">Cleared</div>
      </div>
    `;
    transactionsList.appendChild(item);
  });
}

// Quick Deposit Demo
window.quickDeposit = function(amount) {
  state.checkingBalance += amount;
  state.transactions.unshift({
    id: "TXN-" + Math.floor(1000 + Math.random() * 9000),
    desc: "Instant Demo ATM Deposit",
    type: "credit",
    amount: amount,
    date: "Just now",
    category: "Deposit"
  });
  updateBalances();
  renderTransactions();
};

// Login Flow
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.style.display = "none";

  const user = loginUsername.value.trim();
  const pass = loginPassword.value.trim();
  const pin = document.getElementById("auth-pin-input") ? document.getElementById("auth-pin-input").value : "";

  if ((user === "demo" && (pass === "bank123" || pass === "8842")) || pin === "8842") {
    state.isLoggedIn = true;
    authView.style.display = "none";
    dashboardView.style.display = "block";
    userNav.style.display = "flex";
    updateBalances();
    renderTransactions();
  } else {
    loginError.textContent = "Invalid credentials. Use demo / bank123 or PIN 8842";
    loginError.style.display = "block";
  }
});

// Logout Flow
btnLogout.addEventListener("click", () => {
  state.isLoggedIn = false;
  dashboardView.style.display = "none";
  userNav.style.display = "none";
  authView.style.display = "block";
});

// Transfer Money Flow
transferForm.addEventListener("submit", (e) => {
  e.preventDefault();
  transferFeedback.style.display = "none";

  const fromAcc = transferFrom.value;
  const toRecipient = transferTo.value;
  const amount = parseFloat(transferAmount.value);
  const memo = transferMemo.value.trim() || `Transfer to ${toRecipient}`;

  if (isNaN(amount) || amount <= 0) {
    transferFeedback.className = "feedback-banner error";
    transferFeedback.textContent = "Please enter a valid transfer amount greater than $0.";
    transferFeedback.style.display = "block";
    return;
  }

  // Check funds
  const currentSourceBalance = fromAcc === "checking" ? state.checkingBalance : state.savingsBalance;
  if (amount > currentSourceBalance) {
    transferFeedback.className = "feedback-banner error";
    transferFeedback.textContent = `Insufficient funds! Available in ${fromAcc}: ${formatMoney(currentSourceBalance)}`;
    transferFeedback.style.display = "block";
    return;
  }

  // Deduct
  if (fromAcc === "checking") {
    state.checkingBalance -= amount;
  } else {
    state.savingsBalance -= amount;
  }

  // If transferring to self other account, deposit
  if (toRecipient === "savings") {
    state.savingsBalance += amount;
  } else if (toRecipient === "checking") {
    state.checkingBalance += amount;
  }

  // Add ledger entry
  state.transactions.unshift({
    id: "TXN-" + Math.floor(1000 + Math.random() * 9000),
    desc: memo,
    type: "debit",
    amount: amount,
    date: "Just now",
    category: "Transfer"
  });

  updateBalances();
  renderTransactions();

  transferFeedback.className = "feedback-banner success";
  transferFeedback.textContent = `Successfully transferred ${formatMoney(amount)} to ${toRecipient}!`;
  transferFeedback.style.display = "block";

  const wireConfirmedBanner = document.getElementById("wire-confirmed-banner");
  if (wireConfirmedBanner) wireConfirmedBanner.style.display = "block";
  const transferSuccessToast = document.getElementById("transfer-success-toast");
  if (transferSuccessToast) transferSuccessToast.style.display = "block";

  transferAmount.value = "";
  transferMemo.value = "";
});

// Filter & search events
searchTxn.addEventListener("input", renderTransactions);
filterTxnType.addEventListener("change", renderTransactions);
