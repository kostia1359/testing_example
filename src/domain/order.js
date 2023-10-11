class Order {
  constructor(userId, itemId, quantity, id) {
    this.userId = userId;
    this.itemId = itemId;
    this.quantity = quantity;
    this.id = id;
  }
}

module.exports = Order;
