const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const cta = document.querySelector("[data-tab-target]");
const heroImage = document.getElementById("heroImage");
const heroCounter = document.getElementById("heroCounter");
const thumbs = document.querySelectorAll(".thumb");

const heroSlides = [
  "images/img5.jpg",
  "images/img1.jpg",
  "images/img7.jpg",
  "images/img10.jpg",
  "images/img14.png",
  "images/img11.jpg"
];

let activeSlide = 0;
let sliderTimer = null;

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

function setHeroImage(src, index, fromThumb = false) {
  if (!heroImage) {
    return;
  }

  heroImage.src = src;

  if (heroCounter) {
    heroCounter.textContent = `${index + 1} / ${heroSlides.length}`;
  }

  thumbs.forEach((thumb) => {
    const isActive = thumb.dataset.hero === src;
    thumb.classList.toggle("active", isActive);
  });

  if (!fromThumb) {
    const visibleThumb = Array.from(thumbs).find((thumb) => thumb.dataset.hero === src);
    if (visibleThumb) {
      visibleThumb.classList.add("active");
    }
  }
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % heroSlides.length;
  setHeroImage(heroSlides[activeSlide], activeSlide);
}

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const src = thumb.dataset.hero;
    const index = Number(thumb.dataset.index || "1") - 1;
    activeSlide = Math.max(index, 0);
    setHeroImage(src, activeSlide, true);
    resetSlider();
  });
});

function startSlider() {
  if (sliderTimer) {
    return;
  }
  sliderTimer = setInterval(nextSlide, 3200);
}

function resetSlider() {
  clearInterval(sliderTimer);
  sliderTimer = null;
  startSlider();
}

setHeroImage(heroSlides[0], 0);
startSlider();
