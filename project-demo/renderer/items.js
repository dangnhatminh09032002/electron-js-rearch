const fs = require("fs");
const path = require("path");

let readerFileString;
fs.readFile(path.join(__dirname, "reader.js"), (err, data) => {
  if (!err) readerFileString = data.toString();
});

// DOM nodes
let items = document.getElementById("items");

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

// Persist storage
exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

// Render data to html
exports.render = (listItem = null) => {
  if (!listItem) listItem = this.storage;

  // Reset element
  items.innerHTML = "";

  // Render element for display
  listItem.forEach((item) => {
    this.addItem(item);
  });
};

// Set item as selected
exports.select = (e) => {
  // Remove currently selected item class
  const resetSelectedElement = () => {
    const selectedElement =
      document.getElementsByClassName("read-item selected")[0];
    if (selectedElement) selectedElement.classList.remove("selected");
  };
  resetSelectedElement();
  // Add to clicked item
  e.currentTarget.classList.add("selected");

  // Get items url
  const url = e.currentTarget.dataset.url;

  // Open item in proxy BrowserWindow
  const win = window.open(
    url,
    "",
    `width=1000,height=800,x=200,y=200,nodeIntegration=0`
  );
  win.eval(readerFileString);
  win.addEventListener("close", () => {});
};

// Add new item
exports.addItem = (item, isNew = false) => {
  // Create a new DOM node
  let itemNode = document.createElement("div");

  // Set atributes for item
  itemNode.setAttribute("class", "read-item");
  itemNode.setAttribute("data-url", item.url);

  // Add inner HTML
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  // Attach click handler to select
  itemNode.addEventListener("click", this.select);

  // Append new node to "items"
  items.appendChild(itemNode);

  // Add item to storage and persist
  if (isNew) {
    item.id = this.storage.length;
    this.storage.push(item);
    this.save();
  }
};

// Remove item
exports.remove = () => {
  const listItem = this.storage;
  let oldItem;
  const newListItem = listItem.filter((item) => {
    if (item.id != id) {
      return true;
    } else {
      oldItem = item;
      return false;
    }
  });
  this.render(newListItem);
  return oldItem;
};
