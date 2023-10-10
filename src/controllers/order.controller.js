const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const { orderRepository, userRepository, itemRepository } = require('../repositories');

const orderSchema = Joi.object({
  user_id: Joi.string().required(),
  item_id: Joi.string().required(),
  quantity: Joi.number().integer().positive().required()
});

async function createOrder(ctx) {
  const { error } = orderSchema.validate(ctx.request.body);

  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const { user_id, item_id, quantity } = ctx.request.body;

  const user = userRepository.findById(user_id);
  const item = itemRepository.findById(item_id);

  if (!user || !item || user.money < quantity * item.price) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid order details' };
    return;
  }

  const id = uuidv4();
  const newOrder = orderRepository.createOrder({ userId: user_id, itemId: item_id, quantity });


  user.money -= quantity * item.price;

  ctx.body = newOrder;
  ctx.status = 201;
}

async function getOrders(ctx) {
  const orders = orderRepository.findAll();
  ctx.body = orders;
}

async function getOrderById(ctx) {
  const orderId = ctx.params.id;
  const order = orderRepository.findById(orderId);

  if (!order) {
    ctx.status = 404;
    ctx.body = { error: 'Order not found' };
    return;
  }

  ctx.body = order;
}


module.exports = {
  createOrder,
  getOrderById,
  getOrders
};
