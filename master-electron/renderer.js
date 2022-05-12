// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { nativeImage, ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");

const image = nativeImage.createFromPath(
  path.join(__dirname, "./trayTemplate@5x.png")
);

ipcRenderer.invoke("get-app-path").then((res) => {
  const APP_PATH = res;
  fs.writeFile(
    path.join(APP_PATH, "image-png.png"),
    image.getBitmap(),
    null,
    () => {}
  );
});
