const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const { itemRepository } = require('../repositories');

const itemSchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().integer().positive().required()
});

async function createItem(ctx) {
  const { error } = itemSchema.validate(ctx.request.body);

  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const { user_id, name, price } = ctx.request.body;
  const id = uuidv4();

  const newItem = itemRepository.createItem({ id, name, price, createdBy: user_id });

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
    ctx.body = { error: 'Item not found' };
    return;
  }

  ctx.body = item;
}

module.exports = {
  createItem,
  getItems,
  getItemById
};
