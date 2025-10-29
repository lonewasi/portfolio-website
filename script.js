// 🌙 === Theme Toggle ===
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
  }
});

// 🔝 === Back to Top ===
const backToTop = document.getElementById("back-to-top");
window.onscroll = () => {
  backToTop.classList.toggle("show", document.documentElement.scrollTop > 250);
};
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// 📩 === Contact Modal ===
const modal = document.getElementById("contact-modal");
const openContact = document.getElementById("open-contact");
const openContactBtn = document.getElementById("open-contact-btn");
const closeModal = document.querySelector(".close");

// ✅ Add event listeners safely
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

// 📨 === EmailJS Integration ===
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("status-message");
    status.textContent = "Sending...";
    status.style.color = "#0077ff";

    const serviceID = "service_cb77dzd";
    const templateID = "template_9wz4jq9";
    const publicKey = "jfDn•••••••••••••••••"; // Replace with your real key

    emailjs.init(publicKey);

    emailjs
      .sendForm(serviceID, templateID, this)
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

// 🧭 === Smooth Scroll ===
document.querySelectorAll("nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
