// ====================================================
// AdminPro Enterprise Automation Engine & Mock Store
// ====================================================

// Toast System
function showAdminToast(message, type = "success") {
  let toastEl = document.getElementById("admin-toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "admin-toast";
    toastEl.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f172a;
      color: #ffffff;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      z-index: 9999;
      display: none;
      animation: fadeIn 0.2s ease-out;
      border-left: 4px solid #10b981;
    `;
    document.body.appendChild(toastEl);
  }

  if (type === "error") {
    toastEl.style.borderLeftColor = "#ef4444";
  } else if (type === "info") {
    toastEl.style.borderLeftColor = "#38bdf8";
  } else {
    toastEl.style.borderLeftColor = "#10b981";
  }

  toastEl.textContent = message;
  toastEl.style.display = "block";

  setTimeout(() => {
    toastEl.style.display = "none";
  }, 3500);
}

// Quick Administrative Controls Actions
window.adminAction = function(actionType) {
  if (actionType === "purge-redis") {
    showAdminToast("Redis session cache invalidated. DNS tags warmed successfully (12ms).");
  } else if (actionType === "sync-billing") {
    showAdminToast("Stripe webhooks synced: 142 active tenant subscriptions verified.");
  } else if (actionType === "s3-snapshot") {
    showAdminToast("Snapshot triggered: snapshot-2026-prod-us-east.tar.zst queued.");
  } else if (actionType === "rolling-reboot") {
    showAdminToast("Rolling restart dispatched across 32 worker nodes with zero dropped requests.", "info");
  }
};

// Global Hotkey (Ctrl + K) for Quick Search
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const searchInput = document.querySelector(".header-search-input");
    if (searchInput) {
      searchInput.focus();
    }
  }
});
