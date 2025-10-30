// 🌙 Theme Toggle with Icons
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeIcon.src = theme === "dark" ? "light mode.jpg" : "dark mode.jpg";
  themeIcon.alt = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
});

// Apply saved theme on load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = "light mode.jpg";
  } else {
    themeIcon.src = "dark mode.jpg";
  }
});

// 🔝 Back to top
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // Show button after scrolling 250px
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

// Smooth scroll to top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 📩 Contact Modal
const modal = document.getElementById("contact-modal");
const openContact = document.getElementById("open-contact");
const openContactBtn = document.getElementById("open-contact-btn");
const closeModal = document.querySelector(".close");

if (openContact)
  openContact.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

if (openContactBtn)
  openContactBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

if (closeModal)
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// 📨 EmailJS
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("status-message");
    status.textContent = "Sending...";
    status.style.color = "#0077ff";

    emailjs.init("jfDn•••••••••••••••••");

    emailjs
      .sendForm("service_cb77dzd", "template_9wz4jq9", this)
      .then(() => {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "green";
        this.reset();
        setTimeout(() => (modal.style.display = "none"), 2000);
      })
      .catch(() => {
        status.textContent = "❌ Failed to send message. Please try again.";
        status.style.color = "red";
      });
  });
}

// 🧭 Smooth Scroll for Navbar Links
document.querySelectorAll("nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ✨ Smooth Fade-In on Scroll
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
