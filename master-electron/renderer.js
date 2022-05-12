// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const { Notification } = require("electron");

new Notification("HELlo", { body: "HELLO" }).onclick = () =>
  (document.getElementById("output").innerText = "HELLO");
