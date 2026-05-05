const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const cta = document.querySelector("[data-tab-target]");

function setTab(tabId) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

if (cta) {
  cta.addEventListener("click", () => {
    setTab(cta.dataset.tabTarget);
    document.getElementById("tabs").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}
