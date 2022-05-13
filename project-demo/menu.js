const { Menu } = require("electron");

module.exports = () => {
  // Menu template
  let template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add Item",
          accelerator: "CmdOrCtrl+O",
          click: function (menuItem, browserWindow, event) {
            browserWindow.webContents.send("show-modal");
          },
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+T",
          click: function (item, browserWindow, event) {
            browserWindow.webContents.send("open-item");
          },
        },
        {
          label: "Open Native",
          accelerator: "CmdOrCtrl+E+T",
          click: function (item, browserWindow, event) {
            browserWindow.webContents.send("open-native");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [],
    },
  ];

  // Create Mac app menu
  if (process.flatform == "darwin")
    template.unshift({
      role: "appMenu",
    });

  // Build menu
  let menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};
