// Modules
const { app, BrowserWindow, globalShortcut } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
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

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // This should work on all windows
  // globalShortcut.register("CommandOrControl + G", () => {
  //   console.log("User pressed: " + "Control + G");
  // });

  mainWindow.on("focus", () => {
    globalShortcut.register("CommandOrControl + G", () => {
      console.log("User pressed: " + "Control + G");
    });
  });

  mainWindow.on("blur", () => {
    globalShortcut.unregister("CommandOrControl + G", () => {
      console.log("User unregister key pressed: " + "CommandOrControl + G");
    });
  });

  let count = 0;
  // Register shorcut in global

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
