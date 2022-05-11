module.exports.mainMenus = [
  { label: "My App" },
  {
    label: "Actions",
    submenu: [
      {
        label: "DevTool",
        role: "toggleDevTools",
        click: (menuItem, browserWindow, event) => {
          console.log("DevTool clicked");
        },
      },
      {
        label: "Sub Menu 2",
      },
      {
        label: "Sub Menu 3",
      },
    ],
  },
  { label: "Edit", submenu: [{ role: "copy" }] },
];
