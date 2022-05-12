const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("_API", {
  showName: () => {
    console.log("HELLO");
  },
});
