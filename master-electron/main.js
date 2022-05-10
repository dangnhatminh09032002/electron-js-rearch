// Modules
const { app, BrowserWindow } = require("electron");
const { screen } = require("electron");
const fs = require("fs");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  const FLATFORM = process.platform;

  // Create a window that fills the screen's available work area.
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    // x: 0,
    // y: 0,
    // minWidth: 1000,
    // minHeight: 800,
    title: "Hello World",
    // kiosk: true,
    // fullScreen: true,
    useContentSize: true,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    // show: false,
    backgroundColor: "#ff0000",
    frame: false,
    titleBarStyle: "default",
    transparent: true,
  });

  const wc = mainWindow.webContents;
  console.log(wc);

  // secondWindow = new BrowserWindow({
  //   width: 1000,
  //   height: 800,
  //   useContentSize: true,
  //   webPreferences: {
  //     // --- !! IMPORTANT !! ---
  //     // Disable 'contextIsolation' to allow 'nodeIntegration'
  //     // 'contextIsolation' defaults to "true" as from Electron v12
  //     contextIsolation: false,
  //     nodeIntegration: true,
  //   },
  //   // show: false,
  //   // parent: mainWindow,
  //   // modal: true,
  //   // show: false,
  // });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  // mainWindow.loadURL("https://google.com");
  // secondWindow.loadURL("https://google.com");

  // mainWindow.once("ready-to-show", () => {
  //   // mainWindow.hide();
  //   mainWindow.show();
  // });

  // Handler envent
  // mainWindow.on("blur", () => {
  //   console.log("mainWindow blur event");
  // });
  // secondWindow.on("blur", () => {
  //   console.log("secondWindow blur event");
  // });

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();
  // secondWindow.webContents.openDevTools();
  // Listen for window being closed
  mainWindow.on("closed", (event) => {
    console.log("window closed");
    mainWindow = null;
    // secondWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", () => {
  // const PATH_APP = app.getAppPath();
  // const PATH_APP_LOG = path.join(PATH_APP, "logs");
  // if (!fs.existsSync(PATH_APP_LOG)) fs.mkdirSync(PATH_APP_LOG, () => {});
  // app.setPath("conCaNguNgoc", PATH_APP_LOG);
  // console.log(app.getPath("conCaNguNgoc"));
  console.log("app is ready");
  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("before-quit", (event) => {
  console.log("app is quiting");
});

app.on("will-quit", (event) => {
  console.log("app will quit");
});

app.on("quit", () => {
  console.log("app was quited");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
    // app.exit(0);
    app.quit();
  }
  console.log("app was closed");
});

// app.on("browser-window-focus", (event, browserWindow) => {
//   console.log("app was focused");
// });

// app.on("browser-window-blur", (event, browserWindow) => {
//   console.log("app was unfocused");
// });

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
