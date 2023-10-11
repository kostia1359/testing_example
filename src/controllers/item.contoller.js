const Joi = require("joi");
const { itemRepository, userRepository } = require("../repositories");

const itemSchema = Joi.object({
  createdBy: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().integer().positive().required(),
});

async function createItem(ctx) {
  const { error } = itemSchema.validate(ctx.request.body);

  if (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const { createdBy, name, price } = ctx.request.body;

  const user = userRepository.findById(createdBy);
  if (!user) {
    ctx.status = 400;
    ctx.body = { error: "User not found" };
    return;
  }

  const newItem = itemRepository.createItem({
    name,
    price,
    createdBy,
  });

  ctx.body = newItem;
  ctx.status = 201;
}

async function getItems(ctx) {
  const items = itemRepository.findAll();
  ctx.body = items;
}

async function getItemById(ctx) {
  const itemId = ctx.params.id;
  const item = itemRepository.findById(itemId);

  if (!item) {
    ctx.status = 404;
    ctx.body = { error: "Item not found" };
    return;
  }

  ctx.body = item;
}

module.exports = {
  createItem,
  getItems,
  getItemById,
};
