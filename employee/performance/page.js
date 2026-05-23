/* ── EMPLOYEE PERFORMANCE ── */
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("button").forEach(btn => {
    const t = btn.textContent.trim();
    if (t.includes("Download") || t.includes("Export")) {
      btn.addEventListener("click", () => EMS_Toast.success("Performance report downloaded"));
    }
    if (t.includes("Goal") || t.includes("Set")) {
      btn.addEventListener("click", () => EMS_Toast.info("Goal setting coming soon"));
    }
  });

  // Period filter
  document.querySelectorAll("select").forEach(sel => {
    sel.addEventListener("change", () => EMS_Toast.info("Period updated"));
  });
});
