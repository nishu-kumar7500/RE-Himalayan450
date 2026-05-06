const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const cta = document.querySelector("[data-tab-target]");
const heroImage = document.getElementById("heroImage");
const heroCounter = document.getElementById("heroCounter");
const thumbs = document.querySelectorAll(".thumb");
const galleryImages = document.querySelectorAll(".clickable-photo img");
const photoLightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const heroSlides = [
  { src: "images/img5.jpg", pos: "50% 60%" },
  { src: "images/img1.jpg", pos: "50% 58%" },
  { src: "images/img7.jpg", pos: "48% 60%" },
  { src: "images/img10.jpg", pos: "50% 57%" },
  { src: "images/img14.png", pos: "50% 62%" },
  { src: "images/img11.jpg", pos: "50% 60%" }
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
  const activeThumb = Array.from(thumbs).find((thumb) => thumb.dataset.hero === src);
  const pos = activeThumb?.dataset.pos || heroSlides[index]?.pos || "50% 58%";
  heroImage.style.setProperty("--hero-pos", pos);

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
  setHeroImage(heroSlides[activeSlide].src, activeSlide);
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

setHeroImage(heroSlides[0].src, 0);
startSlider();

function openLightbox(src, alt) {
  if (!photoLightbox || !lightboxImage) {
    return;
  }
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Fullscreen photo";
  photoLightbox.classList.add("open");
  photoLightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!photoLightbox || !lightboxImage) {
    return;
  }
  photoLightbox.classList.remove("open");
  photoLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    openLightbox(image.src, image.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (photoLightbox) {
  photoLightbox.addEventListener("click", (event) => {
    if (event.target === photoLightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoLightbox?.classList.contains("open")) {
    closeLightbox();
  }
});
