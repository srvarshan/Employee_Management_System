// ── SIDEBAR ──────────────────────────────────────────────
const sidebar   = document.getElementById("sidebar");
const overlay   = document.getElementById("sidebarOverlay");
const toggleBtn = document.getElementById("sidebarToggle");
let sidebarOpen = false;
const openSidebar  = () => { sidebar.classList.remove("-translate-x-full"); overlay.classList.remove("hidden"); sidebarOpen = true; };
const closeSidebar = () => { sidebar.classList.add("-translate-x-full"); overlay.classList.add("hidden"); sidebarOpen = false; };
toggleBtn?.addEventListener("click", () => sidebarOpen ? closeSidebar() : openSidebar());
overlay?.addEventListener("click", closeSidebar);

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  const icon = document.getElementById("toastIcon");
  document.getElementById("toastMsg").textContent = msg;
  icon.textContent = type === "success" ? "check_circle" : "error";
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove("show"), 3200);
}

// ── TABS ──────────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + target).classList.add("active");
  });
});

// ── PERSONAL INFO SAVE ────────────────────────────────────
document.getElementById("savePersonalBtn").addEventListener("click", () => {
  let valid = true;
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  document.getElementById("fullName-err").classList.add("hidden");
  document.getElementById("email-err").classList.add("hidden");

  if (!name.value.trim()) {
    document.getElementById("fullName-err").classList.remove("hidden");
    name.classList.add("border-red-400");
    valid = false;
  } else { name.classList.remove("border-red-400"); }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email.value.trim())) {
    document.getElementById("email-err").classList.remove("hidden");
    email.classList.add("border-red-400");
    valid = false;
  } else { email.classList.remove("border-red-400"); }

  if (valid) showToast("Personal information saved successfully");
});

// ── PHOTO UPLOAD ──────────────────────────────────────────
document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast("File too large — max 5 MB", "error"); return; }
  const reader = new FileReader();
  reader.onload = e => { document.getElementById("profilePhoto").src = e.target.result; showToast("Profile photo updated"); };
  reader.readAsDataURL(file);
});

// ── PASSWORD STRENGTH ─────────────────────────────────────
const colors = ["bg-red-400","bg-orange-400","bg-yellow-400","bg-emerald-500"];
const labels = ["Weak","Fair","Good","Strong"];
document.getElementById("newPwd").addEventListener("input", function () {
  const v = this.value;
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  for (let i = 1; i <= 4; i++) {
    const bar = document.getElementById("str" + i);
    bar.className = "flex-1 rounded-full " + (i <= score && v ? colors[score-1] : "bg-outline-variant");
  }
  document.getElementById("strLabel").textContent = v ? labels[score-1] + " password" : "Enter a new password";
});

// ── CHANGE PASSWORD ───────────────────────────────────────
document.getElementById("updatePwdBtn").addEventListener("click", () => {
  const cur = document.getElementById("currentPwd");
  const nw  = document.getElementById("newPwd");
  const cnf = document.getElementById("confirmPwd");
  let valid = true;
  [cur, nw, cnf].forEach(el => el.classList.remove("border-red-400"));
  document.getElementById("currentPwd-err").classList.add("hidden");
  document.getElementById("newPwd-err").classList.add("hidden");
  document.getElementById("confirmPwd-err").classList.add("hidden");

  if (!cur.value) { document.getElementById("currentPwd-err").classList.remove("hidden"); cur.classList.add("border-red-400"); valid = false; }
  if (nw.value.length < 8) { document.getElementById("newPwd-err").classList.remove("hidden"); nw.classList.add("border-red-400"); valid = false; }
  if (nw.value !== cnf.value) { document.getElementById("confirmPwd-err").classList.remove("hidden"); cnf.classList.add("border-red-400"); valid = false; }

  if (valid) { [cur, nw, cnf].forEach(el => el.value = ""); showToast("Password updated successfully"); }
});

// ── SESSIONS ──────────────────────────────────────────────
document.querySelectorAll(".revoke-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const row = this.closest("div.flex");
    row.style.transition = "opacity 0.3s"; row.style.opacity = "0";
    setTimeout(() => row.remove(), 300);
    showToast("Session revoked");
  });
});
document.getElementById("revokeAllBtn").addEventListener("click", () => {
  document.querySelectorAll(".revoke-btn").forEach(b => b.click());
});

// ── LINKED ACCOUNTS ───────────────────────────────────────
document.querySelectorAll(".link-connect-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    this.textContent = "Connecting…";
    setTimeout(() => {
      const row = this.closest("div.flex");
      const sub = row.querySelector(".text-xs.text-outline");
      if (sub) sub.textContent = "Connected";
      this.replaceWith(Object.assign(document.createElement("span"), {
        className: "px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-full",
        textContent: "Connected"
      }));
      showToast("Account linked successfully");
    }, 1200);
  });
});

// ── DOCUMENTS ────────────────────────────────────────────
let rowToDelete = null;
const deleteModal  = document.getElementById("deleteModal");
const confirmDel   = document.getElementById("confirmDelete");
const cancelDel    = document.getElementById("cancelDelete");

document.getElementById("docTable").addEventListener("click", function (e) {
  if (e.target.classList.contains("doc-download")) {
    showToast("Download started");
  }
  if (e.target.classList.contains("doc-delete")) {
    rowToDelete = e.target.closest("tr");
    deleteModal.classList.remove("hidden");
  }
});

confirmDel.addEventListener("click", () => {
  if (rowToDelete) { rowToDelete.remove(); rowToDelete = null; showToast("Document deleted"); }
  deleteModal.classList.add("hidden");
});
cancelDel.addEventListener("click", () => { deleteModal.classList.add("hidden"); rowToDelete = null; });
deleteModal.addEventListener("click", e => { if (e.target === deleteModal) { deleteModal.classList.add("hidden"); rowToDelete = null; } });
document.addEventListener("keydown", e => { if (e.key === "Escape") deleteModal.classList.add("hidden"); });

// ── DOC UPLOAD ────────────────────────────────────────────
document.getElementById("docUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const size = (file.size / (1024 * 1024)).toFixed(1) + " MB";
  const row = document.createElement("tr");
  row.className = "hover:bg-surface-container-lowest transition-colors";
  row.setAttribute("data-type", "Other");
  row.innerHTML = `
    <td class="px-lg py-4"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-slate-500">insert_drive_file</span><span class="font-body-md font-medium">${file.name}</span></div></td>
    <td class="px-lg py-4"><span class="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded uppercase tracking-wider">Other</span></td>
    <td class="px-lg py-4 text-on-surface-variant text-sm">${size}</td>
    <td class="px-lg py-4 text-on-surface-variant text-sm">Today</td>
    <td class="px-lg py-4 text-right flex items-center justify-end gap-3">
      <button class="doc-download text-primary hover:underline font-label-md text-sm">Download</button>
      <button class="doc-delete text-red-400 hover:text-red-600 font-label-md text-sm">Delete</button>
    </td>`;
  document.getElementById("docTable").appendChild(row);
  showToast(`"${file.name}" uploaded`);
  this.value = "";
});

// ── DOC FILTER ────────────────────────────────────────────
document.querySelectorAll(".doc-filter").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".doc-filter").forEach(b => {
      b.className = "doc-filter px-3 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high";
    });
    this.className = "doc-filter active-filter px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white";
    const filter = this.dataset.filter;
    document.querySelectorAll("#docTable tr").forEach(row => {
      row.style.display = (filter === "all" || row.dataset.type === filter) ? "" : "none";
    });
  });
});

// ── DIGEST FREQUENCY ──────────────────────────────────────
document.querySelectorAll('input[name="digest"]').forEach(radio => {
  radio.addEventListener("change", function () {
    document.querySelectorAll(".digest-option > div").forEach(d => {
      d.classList.remove("border-primary","bg-primary/5");
      d.classList.add("border-outline-variant");
      d.querySelector("span")?.classList.remove("text-primary");
      d.querySelector("span")?.classList.add("text-on-surface-variant");
      d.querySelectorAll("p").forEach(p => { p.classList.remove("text-primary"); p.classList.add("text-on-surface","text-outline"); });
    });
    const sel = this.closest(".digest-option").querySelector("div");
    sel.classList.add("border-primary","bg-primary/5");
    sel.classList.remove("border-outline-variant");
    sel.querySelector("span")?.classList.add("text-primary");
    sel.querySelector("span")?.classList.remove("text-on-surface-variant");
  });
});

document.getElementById("saveNotifBtn").addEventListener("click", () => {
  showToast("Notification preferences saved");
});
