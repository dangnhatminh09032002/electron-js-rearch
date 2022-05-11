// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log("Renderer is available");
const { desktopCapturer } = require("electron");

document.getElementById("screenshot-button").addEventListener("click", () => {
  desktopCapturer
    .getSources({
      types: ["screen"],
      thumbnailSize: { width: 1920, height: 1080 },
    })
    .then((sources) => {
      console.log(sources);
      document.getElementById("screenshot").src =
        sources[2].thumbnail.toDataURL();
      console.log(sources[0].thumbnail.toDataURL());
    });
});
