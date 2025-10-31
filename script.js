const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// 🌓 Apply saved theme instantly (no white flash)
const savedTheme = localStorage.getItem("theme");

// Set default instantly (before any transition)
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeIcon.src = "light-mode.png"; // ☀️
} else {
  body.classList.remove("dark-mode");
  themeIcon.src = "dark-mode.png"; // 🌙
}

// 🌗 Fade-in only after correct image is ready
themeIcon.style.opacity = "0";

themeIcon.addEventListener("load", () => {
  requestAnimationFrame(() => {
    themeIcon.style.transition = "opacity 0.3s ease";
    themeIcon.style.opacity = "1"; // fade in when image is ready
  });
});

// 🌙 Toggle theme on click
themeIcon.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  themeIcon.src = isDark ? "light-mode.png" : "dark-mode.png";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});



// 🔝 BACK TO TOP BUTTON
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 250) {
    backToTop.style.opacity = "1";
    backToTop.style.pointerEvents = "auto";
    backToTop.style.transform = "scale(1)";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.pointerEvents = "none";
    backToTop.style.transform = "scale(0.8)";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// 📩 CONTACT MODAL
const modal = document.getElementById("contact-modal");
const openContact = document.getElementById("open-contact");
const openContactBtn = document.getElementById("open-contact-btn");
const closeModal = document.querySelector(".close");

if (openContact) {
  openContact.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
}

if (openContactBtn) {
  openContactBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


// 🧭 SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll("nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});


// ✨ FADE-IN ANIMATION ON SCROLL
const fadeSections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  },
  { threshold: 0.2 }
);

fadeSections.forEach((section) => {
  section.style.animationPlayState = "paused";
  observer.observe(section);
});
