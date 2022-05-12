// Modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
app.disableHardwareAcceleration();

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
    show: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      offscreen: true,
    },
  });

  // Handle events for webContents
  mainWindow.webContents.on("did-finish-load", () => {
    console.log(mainWindow.getTitle());
    mainWindow.close();
  });

  const counters = {
    current: 0,
  };
  mainWindow.webContents.on("paint", (event, dirtyRect, image) => {
    const APP_PATH = app.getAppPath();

    // Check directory exit, if false will create
    if (counters.current === 0)
      fs.access(path.join(APP_PATH, "images"), function (error) {
        if (error) fs.mkdir(path.join(APP_PATH, "images"), () => {});
      });

    const IMAGES_PATH = path.join(
      APP_PATH,
      "images",
      `image_${counters.current}.png`
    );

    const screenshot = image.toPNG();

    fs.writeFile(IMAGES_PATH, screenshot, (err, data) => {
      if (!err) console.log(`image_${counters.current}.png saved`);
      counters.current++;
    });
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadURL("https://www.facebook.com");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

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
