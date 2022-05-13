const fs = require("fs");

// Get readerJS content
let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJS = data.toString();
});

// DOM nodes
let items = document.getElementById("items");

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

// Persist storage
exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

// Open selected item
exports.open = () => {
  // Only if we have items (in case of menu open)
  if (!this.storage.length) return;

  // Get selected item
  let selectedItem = document.getElementsByClassName("read-item selected")[0];

  // Get item's url
  let contentURL = selectedItem.dataset.url;

  // Open item in proxy BrowserWindow
  let readerWin = window.open(
    contentURL,
    "_blank",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );

  // Inject JavaScript with specific item index (selectedItem.index)
  readerWin.eval(readerJS);
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
  itemNode.addEventListener("dblclick", this.open);

  // Append new node to "items"
  items.appendChild(itemNode);

  // Add item to storage and persist
  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

// // Listen for "done" message from reader window
// window.addEventListener("message", (e) => {
//   // Check for correct message
//   if (e.data.action === "delete-reader-item") {
//     // Delete item at given index
//     this.delete(e.data.itemIndex);

//     // Close the reader window
//     e.source.close();
//   }
// });

// // Delete item
// exports.delete = (itemIndex) => {
//   // Remove item from DOM
//   items.removeChild(items.childNodes[itemIndex]);

//   // Remove item from storage
//   this.storage.splice(itemIndex, 1);

//   // Persist storage
//   this.save();

//   // Select previous item or new top item
//   if (this.storage.length) {
//     // Get new selected item index
//     let = newSelectedItemIndex = itemIndex === 0 ? 0 : itemIndex - 1;

//     // Select item at new index
//     document
//       .getElementsByClassName("read-item")
//       [newSelectedItemIndex].classList.add("selected");
//   }
// };

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

// Add items from storage when app loads
this.storage.forEach((item) => {
  this.addItem(item);
});
