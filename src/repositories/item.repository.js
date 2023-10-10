const { Item } = require('../domain');

class ItemRepository {
  constructor() {
    this.items = [];
  }

  createItem({ id, name, price, createdBy }) {
    const newItem = new Item(id, name, price, createdBy);
    this.items.push(newItem);
    return newItem;
  }

  findById(itemId) {
    return this.items.find(item => item.id === itemId);
  }

  findAll() {
    return this.items;
  }
}

module.exports = new ItemRepository(); 