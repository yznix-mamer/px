function openModal(role) {
  document.getElementById("modal-role").textContent = role;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Optional: click outside to close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) closeModal();
});
