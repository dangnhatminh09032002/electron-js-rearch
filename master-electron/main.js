// Modules
const { app, BrowserWindow, dialog, ipcMain } = require("electron");

let mainWindow;

const askFruit = async () => {
  const fruits = ["Apple", "Orange", "Grape"];
  const choice = await dialog
    .showMessageBox({
      message: "Pick a fruit",
      buttons: fruits,
    })
    .then((result) => {
      return result.response;
    });

  return fruits[choice];
};

// ipcMain.on("ask-fruit", async (event) => {
//   await askFruit().then((result) => {
//     event.reply("answer-fruit", result);
//   });
// });
ipcMain.handle("ask-fruit", async (event) => {
  const response = await askFruit();
  console.log(response);
  return response;
});

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
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: false,
    },
  });

  // Event handlers
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("renderer-log-response", "hello minh");
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
