const Joi = require("joi");
const {
  orderRepository,
  userRepository,
  itemRepository,
} = require("../repositories");

const orderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  itemId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().positive().required(),
});

async function createOrder(ctx) {
  const { error } = orderSchema.validate(ctx.request.body);

  if (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const { userId, itemId, quantity } = ctx.request.body;

  const user = userRepository.findById(userId);
  const item = itemRepository.findById(itemId);

  if (!user || !item) {
    ctx.status = 400;
    ctx.body = { error: "Invalid order details" };
    return;
  }

  if (user.money < quantity * item.price) {
    ctx.status = 400;
    ctx.body = { error: "Not enough money" };
    return;
  }

  const newOrder = orderRepository.createOrder({
    userId: userId,
    itemId: itemId,
    quantity,
  });

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
    ctx.body = { error: "Order not found" };
    return;
  }

  ctx.body = order;
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
};
