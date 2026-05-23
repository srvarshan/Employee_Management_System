/* ── NOTIFICATIONS ── */
document.addEventListener("DOMContentLoaded", () => {

  // Mark all as read
  document.querySelectorAll("button").forEach(btn => {
    const t = btn.textContent.trim();
    if (t.includes("Mark all") || t.includes("Clear all")) {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".w-2.rounded-full:not(.bg-slate-200), [class*='bg-blue'], [class*='bg-amber']").forEach(dot => {
          dot.className = dot.className.replace(/bg-blue-\d+|bg-amber-\d+|bg-red-\d+/, "bg-slate-200");
        });
        EMS_Toast.info("All notifications marked as read");
      });
    }
    if (t.includes("Delete") || t.includes("Clear")) {
      btn.addEventListener("click", () => {
        const item = btn.closest("li, .notification-item, div.flex");
        if (item) { item.style.opacity = "0"; setTimeout(() => item.remove(), 300); }
        EMS_Toast.success("Notification dismissed");
      });
    }
  });

  // Notification items clickable
  document.querySelectorAll("li, .notification-item").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => EMS_Toast.info("Opening notification details…"));
  });
});
