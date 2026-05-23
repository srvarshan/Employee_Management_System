/* ── APPLY LEAVE ── */
document.addEventListener("DOMContentLoaded", () => {

  // Leave type selection
  const leaveTypes = ["Annual Leave","Sick Leave","Casual Leave","Emergency Leave","Unpaid Leave"];
  let selectedType = null;

  document.querySelectorAll("button").forEach(btn => {
    const t = btn.textContent.trim();

    if (leaveTypes.includes(t)) {
      btn.addEventListener("click", () => {
        document.querySelectorAll("button").forEach(b => {
          if (leaveTypes.includes(b.textContent.trim())) {
            b.classList.remove("bg-primary","text-white","ring-2","ring-primary");
            b.classList.add("bg-white","text-slate-700","border-slate-200");
          }
        });
        btn.classList.add("bg-primary","text-white","ring-2","ring-primary");
        btn.classList.remove("bg-white","text-slate-700");
        selectedType = t;
      });
    }

    if (t === "Cancel") {
      btn.addEventListener("click", () => {
        if (confirm("Cancel leave application?")) history.back();
      });
    }

    if (t.includes("Submit") || t.includes("Apply")) {
      btn.addEventListener("click", () => {
        const startDate = document.querySelector('input[type="date"]')?.value;
        if (!selectedType) { EMS_Toast.warning("Please select a leave type"); return; }
        if (!startDate)    { EMS_Toast.warning("Please select a start date"); return; }
        EMS_Form.setLoading(btn, true);
        setTimeout(() => {
          EMS_Form.setLoading(btn, false);
          EMS_Toast.success("Leave application submitted successfully!");
          setTimeout(() => history.back(), 1500);
        }, 1400);
      });
    }
  });

  // Date range calculation
  document.querySelectorAll('input[type="date"]').forEach(inp => {
    inp.addEventListener("change", () => {
      const dates = document.querySelectorAll('input[type="date"]');
      if (dates.length >= 2 && dates[0].value && dates[1].value) {
        const diff = Math.ceil(
          (new Date(dates[1].value) - new Date(dates[0].value)) / (1000*60*60*24)
        );
        if (diff >= 0) EMS_Toast.info(`Duration: ${diff + 1} day(s)`);
      }
    });
  });
});
