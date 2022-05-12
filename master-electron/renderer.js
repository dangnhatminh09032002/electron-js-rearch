// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const updateStatus = () => {
  const statusElement = document.getElementById("status");
  statusElement.innerHTML = navigator.onLine ? "Online" : "Offline";
};

window.addEventListener("load", () => {
  updateStatus();
  window.removeEventListener("load", () => {});
  window.addEventListener("online", () => {
    updateStatus();
  });
  window.addEventListener("offline", () => {
    updateStatus();
  });
});
