/* ── SALARY SLIPS ── */
document.addEventListener("DOMContentLoaded", () => {

  EMS_Table.init("table", { searchId: "list-search-input", pageSize: 8 });

  document.querySelectorAll("button").forEach(btn => {
    const t = btn.textContent.trim();
    if (t.includes("Download PDF") || t.includes("Download →") || t === "Download") {
      btn.addEventListener("click", () => {
        EMS_Form.setLoading(btn, true);
        setTimeout(() => {
          EMS_Form.setLoading(btn, false);
          EMS_Toast.success("Payslip PDF downloaded");
        }, 1000);
      });
    }
  });

  // Row click
  document.querySelectorAll("tbody tr").forEach(row => {
    row.style.cursor = "pointer";
    row.classList.add("hover:bg-blue-50", "transition");
    row.addEventListener("click", () => EMS_Toast.info("Opening salary slip details…"));
  });

  // Year/Month filter
  document.querySelectorAll("select").forEach(sel => {
    sel.addEventListener("change", () => EMS_Toast.info("Filtering salary slips…"));
  });
});
