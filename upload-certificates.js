const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("certificateFile");
const certificateList = document.getElementById("certificateList");

// 🔹 Load certificates from localStorage when page loads
const savedCertificates = JSON.parse(localStorage.getItem("certificates")) || [];
renderCertificates(savedCertificates);

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Please select a certificate to upload.");
    return;
  }

  let stored = JSON.parse(localStorage.getItem("certificates")) || [];

  for (let file of files) {
    if (file.size > 8 * 1024 * 1024) { // optional size limit 8MB
      alert(`${file.name} is too large (max 8MB).`);
      continue;
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      const certObj = {
        name: file.name,
        type: file.type,
        data: ev.target.result
      };

      stored.push(certObj);
      localStorage.setItem("certificates", JSON.stringify(stored));
      renderCertificates(stored);
    };

    reader.readAsDataURL(file);
  }

  fileInput.value = ""; // reset input
});

// 🔹 Function to display uploaded certificates
function renderCertificates(certs) {
  certificateList.innerHTML = "";
  certs.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "cert-item";

    if (file.type.startsWith("image/")) {
      item.innerHTML = `
        <img src="${file.data}" alt="${file.name}">
        <button class="delete-btn">×</button>
        <p class="cert-name">${file.name}</p>
      `;
    } else {
      item.innerHTML = `
        <a href="${file.data}" target="_blank">${file.name}</a>
        <button class="delete-btn">×</button>
      `;
    }

    certificateList.appendChild(item);

    // 🔹 delete handler
    item.querySelector(".delete-btn").addEventListener("click", () => {
      certs.splice(index, 1);
      localStorage.setItem("certificates", JSON.stringify(certs));
      renderCertificates(certs);
    });
  });
}
