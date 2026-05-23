/* ── EMPLOYEE ATTENDANCE VIEW ── */
document.addEventListener("DOMContentLoaded", () => {

  EMS_Table.init("table", { searchId: "list-search-input", pageSize: 10 });

  // Month navigation
  document.querySelectorAll("button").forEach(btn => {
    const icon = btn.querySelector(".material-symbols-outlined");
    if (!icon) return;
    const ic = icon.textContent.trim();
    if (ic === "chevron_left" || ic === "navigate_before") {
      btn.addEventListener("click", () => EMS_Toast.info("Previous month"));
    }
    if (ic === "chevron_right" || ic === "navigate_next") {
      btn.addEventListener("click", () => EMS_Toast.info("Next month"));
    }
    if (btn.textContent.trim().includes("Export") || btn.textContent.trim().includes("Download")) {
      btn.addEventListener("click", () => EMS_Toast.success("Attendance report downloaded"));
    }
  });

  // Calendar day clicks
  document.querySelectorAll("[class*='calendar'], [class*='day']").forEach(day => {
    if (day.textContent.match(/^\d+$/)) {
      day.style.cursor = "pointer";
      day.addEventListener("click", () => {
        const d = day.textContent.trim();
        EMS_Toast.info(`Attendance for day ${d}`);
      });
    }
  });
});
