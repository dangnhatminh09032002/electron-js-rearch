// Modules
const { app, BrowserWindow, Tray, Menu } = require("electron");

let mainWindow;

const createTray = (url) => {
  return new Tray(url);
};

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

  // Tray
  const tray = createTray("./trayTemplate@5x.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit app",
      role: "quit",
      // type: "normal",
      // click: (menuItem, browserWindow) => {
      //   app.quit();
      // },
    },
  ]);
  tray.setToolTip("This is app hello");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Handle event webContents

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
