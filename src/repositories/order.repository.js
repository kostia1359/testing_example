const { Order } = require("../domain");
const { v4: uuidv4 } = require("uuid");

class OrderRepository {
  constructor() {
    this.orders = [];
  }

  createOrder({ userId, itemId, quantity }) {
    const id = uuidv4();

    const newOrder = new Order(userId, itemId, quantity, id);
    this.orders.push(newOrder);
    return newOrder;
  }

  findById(orderId) {
    return this.orders.find((order) => order.id === orderId);
  }

  findAll() {
    return this.orders;
  }
}

module.exports = new OrderRepository();
