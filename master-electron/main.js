// Modules
const { app, BrowserWindow, dialog } = require("electron");

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

  // Handle webContents events
  mainWindow.webContents.on("did-finish-load", () => {
    // dialog
    //   .showOpenDialog(mainWindow, {
    //     title: "Hello world!",
    //     buttonLabel: "Select a photo",
    //     defaultPath: app.getPath("desktop"),
    //     properties: ["multiSelections"],
    //   })
    //   .then((result) => {
    //     const paths = result.filePaths;
    //     mainWindow.webContents.executeJavaScript(
    //       `
    //       const paths = ${JSON.stringify(paths)};
    //       paths.forEach(function(path){
    //         var img = document.createElement("img");
    //         img.src = path;
    //         img.setAttribute("class", "w-100 vh-50");
    //         const imgContainer = document.getElementById("multi-image")
    //         imgContainer.appendChild(img);
    //       })
    //       `
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // dialog.showSaveDialog(mainWindow, {}).then((result) => {
    //   console.log(result);
    // });

    const answers = ["Yes", "No", "Cancel"];
    dialog
      .showMessageBox(mainWindow, {
        title: "say hello",
        message: "Good morning",
        detail: "My name is Minh",
        buttons: answers,
      })
      .then((result) => {
        console.log(`User selected "${answers[result.response]}"`);
      });
  });

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
