const certificateList = document.getElementById("certificateList");
const certs = JSON.parse(localStorage.getItem("certificates")) || [];

if (certs.length === 0) {
  certificateList.innerHTML = "<p>No certificates uploaded yet.</p>";
} else {
  certs.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "cert-item";

    if (file.type.startsWith("image/")) {
      item.innerHTML = `
        <img src="${file.data}" alt="${file.name}" class="preview-img">
        <p class="cert-name">${file.name}</p>
      `;
    } else {
      item.innerHTML = `
        <a href="${file.data}" target="_blank">${file.name}</a>
      `;
    }

    certificateList.appendChild(item);
  });
}

/* 🖼️ Optional: Fullscreen Preview on Click */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("preview-img")) {
    const overlay = document.createElement("div");
    overlay.className = "img-overlay";
    overlay.innerHTML = `
      <div class="overlay-content">
        <img src="${e.target.src}" alt="Preview">
        <span class="close-btn">&times;</span>
      </div>
    `;

    document.body.appendChild(overlay);

    // close overlay
    overlay.querySelector(".close-btn").addEventListener("click", () => {
      overlay.remove();
    });

    // close on outside click
    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay) overlay.remove();
    });
  }
});
