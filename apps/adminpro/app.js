// Initial Users Data
let users = [
  { id: "USR-101", name: "Sarah Connor", email: "sarah.connor@cyberdyne.io", role: "Admin", status: "Active", lastLogin: "10 mins ago" },
  { id: "USR-102", name: "David Kim", email: "david.kim@example.com", role: "Editor", status: "Active", lastLogin: "2 hours ago" },
  { id: "USR-103", name: "Elena Rostova", email: "elena.r@agency.com", role: "Viewer", status: "Inactive", lastLogin: "5 days ago" },
  { id: "USR-104", name: "Marcus Brody", email: "m.brody@museum.edu", role: "Editor", status: "Active", lastLogin: "Yesterday" },
  { id: "USR-105", name: "Clara Oswald", email: "clara.o@tardis.org", role: "Admin", status: "Active", lastLogin: "Just now" },
  { id: "USR-106", name: "James Holden", email: "j.holden@rocinante.space", role: "Viewer", status: "Active", lastLogin: "3 hours ago" },
  { id: "USR-107", name: "Naomi Nagata", email: "nagata@belters.net", role: "Editor", status: "Active", lastLogin: "1 hour ago" },
  { id: "USR-108", name: "Arthur Dent", email: "arthur@guide.galaxy", role: "Viewer", status: "Inactive", lastLogin: "2 weeks ago" }
];

let currentPage = 1;
const itemsPerPage = 5;
let userToDeleteId = null;

// DOM Elements
const usersTableBody = document.getElementById("users-table-body");
const userSearch = document.getElementById("user-search");
const roleFilter = document.getElementById("role-filter");
const statusFilter = document.getElementById("status-filter");
const resultsCount = document.getElementById("results-count");
const btnPrevPage = document.getElementById("btn-prev-page");
const btnNextPage = document.getElementById("btn-next-page");
const pageIndicator = document.getElementById("page-indicator");

const addUserBtn = document.getElementById("add-user-btn");
const userModal = document.getElementById("user-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnCancelUser = document.getElementById("btn-cancel-user");
const userForm = document.getElementById("user-form");
const modalTitle = document.getElementById("modal-title");
const editUserIdInput = document.getElementById("edit-user-id");
const userNameInput = document.getElementById("user-name-input");
const userEmailInput = document.getElementById("user-email-input");
const userRoleSelect = document.getElementById("user-role-select");
const userStatusSelect = document.getElementById("user-status-select");

const deleteModal = document.getElementById("delete-modal");
const btnCancelDelete = document.getElementById("btn-cancel-delete");
const btnConfirmDelete = document.getElementById("btn-confirm-delete");
const deletePromptText = document.getElementById("delete-prompt-text");
const toast = document.getElementById("toast");

// Toast utility
function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Render Table
function getFilteredUsers() {
  const query = userSearch.value.toLowerCase().trim();
  const selectedRole = roleFilter.value;
  const selectedStatus = statusFilter.value;

  return users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(query) ||
                          user.email.toLowerCase().includes(query) ||
                          user.id.toLowerCase().includes(query);
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });
}

function renderTable() {
  const filtered = getFilteredUsers();
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  resultsCount.textContent = `Showing ${pageItems.length} of ${filtered.length} users`;
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  btnPrevPage.disabled = currentPage <= 1;
  btnNextPage.disabled = currentPage >= totalPages;

  usersTableBody.innerHTML = "";

  if (pageItems.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="6" style="text-align:center; padding: 2rem; color: #94a3b8;">No matching users found.</td>`;
    usersTableBody.appendChild(emptyRow);
    return;
  }

  pageItems.forEach(user => {
    const row = document.createElement("tr");
    row.setAttribute("data-testid", "user-row");
    row.setAttribute("data-user-id", user.id);

    row.innerHTML = `
      <td><code>${user.id}</code></td>
      <td>
        <div class="user-cell">
          <span class="name" data-testid="user-cell-name">${user.name}</span>
          <span class="email" data-testid="user-cell-email">${user.email}</span>
        </div>
      </td>
      <td>
        <span class="badge-role ${user.role}" data-testid="user-cell-role">${user.role}</span>
      </td>
      <td>
        <span class="status-dot ${user.status}" data-testid="user-cell-status">${user.status}</span>
      </td>
      <td>${user.lastLogin}</td>
      <td>
        <div class="table-actions">
          <button class="btn-icon" data-testid="btn-edit-user" onclick="openEditModal('${user.id}')" title="Edit User">✏️ Edit</button>
          <button class="btn-icon delete" data-testid="btn-delete-user" onclick="openDeleteModal('${user.id}')" title="Delete User">🗑️ Delete</button>
        </div>
      </td>
    `;
    usersTableBody.appendChild(row);
  });
}

// Modal Handlers
addUserBtn.addEventListener("click", () => {
  modalTitle.textContent = "Create New User";
  editUserIdInput.value = "";
  userForm.reset();
  userModal.style.display = "flex";
});

window.openEditModal = function(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  modalTitle.textContent = "Edit User Details";
  editUserIdInput.value = user.id;
  userNameInput.value = user.name;
  userEmailInput.value = user.email;
  userRoleSelect.value = user.role;
  userStatusSelect.value = user.status;

  userModal.style.display = "flex";
};

function closeModal() {
  userModal.style.display = "none";
}

btnCloseModal.addEventListener("click", closeModal);
btnCancelUser.addEventListener("click", closeModal);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editUserIdInput.value;
  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();
  const role = userRoleSelect.value;
  const status = userStatusSelect.value;

  if (id) {
    // Update
    const user = users.find(u => u.id === id);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      user.status = status;
      showToast(`User ${name} updated successfully!`);
    }
  } else {
    // Create
    const newId = "USR-" + (100 + users.length + 1);
    users.unshift({
      id: newId,
      name,
      email,
      role,
      status,
      lastLogin: "Just now"
    });
    showToast(`New user ${name} created!`);
  }

  closeModal();
  renderTable();
  document.getElementById("kpi-users").textContent = users.length.toLocaleString();
});

// Delete flow
window.openDeleteModal = function(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  userToDeleteId = id;
  deletePromptText.textContent = `Are you sure you want to delete ${user.name} (${user.id})?`;
  deleteModal.style.display = "flex";
};

btnCancelDelete.addEventListener("click", () => {
  userToDeleteId = null;
  deleteModal.style.display = "none";
});

btnConfirmDelete.addEventListener("click", () => {
  if (userToDeleteId) {
    users = users.filter(u => u.id !== userToDeleteId);
    showToast("User deleted successfully.");
    userToDeleteId = null;
    deleteModal.style.display = "none";
    renderTable();
    document.getElementById("kpi-users").textContent = users.length.toLocaleString();
  }
});

// Pagination
btnPrevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

btnNextPage.addEventListener("click", () => {
  currentPage++;
  renderTable();
});

// Filters & Search
userSearch.addEventListener("input", () => {
  currentPage = 1;
  renderTable();
});

roleFilter.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

// Navigation items toggle
document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    item.classList.add("active");
    const tabName = item.getAttribute("data-tab");
    document.getElementById("view-title").textContent = item.textContent.trim();
  });
});

// Initialize
renderTable();
