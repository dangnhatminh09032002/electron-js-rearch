// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");

const talkElement = document
  .getElementById("talk")
  .addEventListener("click", () => {
    console.log("Sending event");
    ipcRenderer.send("hello-word", "Send event successfully", 12);
  });

ipcRenderer.on("renderer-log-response", (event, ...args) => {
  console.log(JSON.stringify(args));
  console.log(JSON.stringify(args));
});
