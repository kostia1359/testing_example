const { Item } = require("../domain");
const { v4: uuidv4 } = require("uuid");

class ItemRepository {
  constructor() {
    this.items = [];
  }

  createItem({ name, price, createdBy }) {
    const id = uuidv4();
    const newItem = new Item(id, name, price, createdBy);
    this.items.push(newItem);
    return newItem;
  }

  findById(itemId) {
    return this.items.find((item) => item.id === itemId);
  }

  findAll() {
    return this.items;
  }
}

module.exports = new ItemRepository();
