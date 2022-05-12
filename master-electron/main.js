// Modules
const { app, BrowserWindow, ipcMain, Notification } = require("electron");

app.setAppUserModelId(process.execPath);
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
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // Handle events for webContents

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("./index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Create new event listener
ipcMain.handle("get-app-path", (event, ...args) => {
  const APP_PATH = app.getAppPath();
  return APP_PATH;
});

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
