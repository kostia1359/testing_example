const { Order } = require('../domain');

class OrderRepository {
  constructor() {
    this.orders = [];
  }

  createOrder({ userId, itemId, quantity }) {
    const newOrder = new Order(userId, itemId, quantity);
    this.orders.push(newOrder);
    return newOrder;
  }

  findById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  findAll() {
    return this.orders;
  }
}

module.exports = new OrderRepository(); 
