// DOM nodes
let items = document.getElementById("items");
exports.element = items;

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];
// Add items from storage when app loads
exports.render = (listItem = null) => {
  if (!listItem) listItem = this.storage;
  items.innerHTML = "";
  listItem.forEach((item) => {
    this.addItem(item);
  });
  items.childNodes.forEach((item) => {
    item.addEventListener("click", function (event) {
      const ADD_CLASS = "selected";
      const listElement = [...items.getElementsByClassName(ADD_CLASS)];
      listElement.forEach((element) => {
        if (!item.classList.contains(ADD_CLASS))
          element.classList.remove(ADD_CLASS);
      });
      this.classList.add(ADD_CLASS);
    });
  });
};

// Persist storage
exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

// Add new item
exports.addItem = (item, isNew = false) => {
  // Create a new DOM node
  let itemNode = document.createElement("div");

  // Assign "read-item" class
  itemNode.setAttribute("class", "read-item");

  // Add inner HTML
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  // Append new node to "items"
  items.appendChild(itemNode);

  // Add item to storage and persist
  if (isNew) {
    item.id = this.storage.length;
    this.storage.push(item);
    this.save();
  }
};

// Filter items
exports.filter = (str) => {
  const listItem = this.storage;
  str = str
    .split(" ")
    .reduce(
      (previousValue, currentValue) => previousValue + `(?=.*${currentValue})`,
      ""
    );
  const reg = new RegExp(`${str.toLowerCase()}`, "g");
  const itemsFiltered = listItem.filter((item) =>
    item.title.toLowerCase().match(reg)
  );
  this.render(itemsFiltered);
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
