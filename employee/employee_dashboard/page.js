/* ── EMPLOYEE DASHBOARD ── */
document.addEventListener("DOMContentLoaded", () => {

  // Check In / Check Out toggle
  const checkInBtn  = document.querySelector("button");
  let checkedIn = false;

  document.querySelectorAll("button").forEach(btn => {
    const t = btn.textContent.trim();

    if (t.includes("Check In")) {
      btn.addEventListener("click", () => {
        checkedIn = true;
        btn.innerHTML = `<span class="material-symbols-outlined text-sm">logout</span> Check Out`;
        btn.classList.replace("bg-primary", "bg-emerald-600");
        EMS_Toast.success("Checked in at " + new Date().toLocaleTimeString());
      });
    }

    if (t.includes("Check Out")) {
      btn.addEventListener("click", () => {
        checkedIn = false;
        EMS_Toast.info("Checked out at " + new Date().toLocaleTimeString());
      });
    }

    if (t.includes("Download Payslip")) {
      btn.addEventListener("click", () => EMS_Toast.success("Payslip download started"));
    }

    if (t.includes("View All") || t.includes("View All chevron_right")) {
      btn.addEventListener("click", () => EMS_navTo("notifications"));
    }
  });

  // Quick action cards
  document.querySelectorAll(".card, [class*='rounded']").forEach(card => {
    const text = card.textContent.trim().toLowerCase();
    if (text.includes("apply leave"))   card.addEventListener("click", () => EMS_navTo("apply-leave"));
    if (text.includes("salary slip"))   card.addEventListener("click", () => EMS_navTo("salary"));
    if (text.includes("performance"))   card.addEventListener("click", () => EMS_navTo("performance"));
    if (text.includes("attendance"))    card.addEventListener("click", () => EMS_navTo("attendance"));
  });
});
