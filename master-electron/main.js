// Modules
const { app, BrowserWindow, powerMonitor, screen } = require("electron");

let mainWindow;

const loggerInBrowser = (details) => {
  mainWindow.webContents.executeJavaScript(
    `console.log(${JSON.stringify(details)})`
  );
};
// Create a new BrowserWindow when `app` is ready
function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  mainWindow = new BrowserWindow({
    width: primaryDisplay.bounds.width,
    height: primaryDisplay.bounds.height,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Work wtih Screen

  loggerInBrowser(screen.getAllDisplays());
  screen.on("display-metrics-changed", () => {
    loggerInBrowser(screen.getAllDisplays());
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Handle powerMonitor
  powerMonitor.on("suspend", () => {
    console.log("Saving data before suspend");
  });

  powerMonitor.on("resume", () => {
    console.log("Resuming data");
  });

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
