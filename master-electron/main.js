// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const loggerInBrowser = (details) => {
  mainWindow.webContents.executeJavaScript(
    `console.log(${JSON.stringify(details)})`
  );
};

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const progressBar = () => {
    const INCREMENT = 0.03;
    const INTERVAL_DELAY = 100; // ms
    let c = 0;
    const progressInterval = setInterval(() => {
      // update progress bar to next value
      // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
      mainWindow.setProgressBar(c);
      // increment or reset progress bar
      if (c <= 1) {
        c += INCREMENT;
      } else {
        // c = -INCREMENT * 5; // reset to a bit less than 0 to show reset state
        clearInterval(progressInterval);
        mainWindow.setProgressBar(-1);
      }
    }, INTERVAL_DELAY);
    app.on("before-quit", () => {
      clearInterval(progressInterval);
    });
  };
  progressBar();

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("./index.html");

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
