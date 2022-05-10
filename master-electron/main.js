// Modules
const { app, BrowserWindow, session } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let ses = session.defaultSession;

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  ses.on("will-download", (event, item, webContents) => {
    console.log("starting download");
    const fileName = item.getFilename();
    const fileSize = item.getTotalBytes();

    // Save to desktop
    const PATH = path.join(app.getPath("desktop"), fileName);
    item.setSavePath(PATH);
    item.on("updated", (event, state) => {
      let received = item.getReceivedBytes();
      if (state === "progressing" && received) {
        let progressing = Math.round((received / fileSize) * 100);
        webContents.executeJavaScript(
          `document.getElementById("progress-download-image").value = ${progressing}`
        );
      }
      console.log(received);
    });
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
