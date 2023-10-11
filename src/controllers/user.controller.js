const Joi = require("joi");
const { userRepository } = require("../repositories");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  money: Joi.number().integer().positive().required(),
});

async function createUser(ctx) {
  const { error } = userSchema.validate(ctx.request.body);

  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }

  const { name, email, money } = ctx.request.body;

  const newUser = userRepository.createUser({ name, email, money });

  ctx.body = newUser;
  ctx.status = 201;
}

async function getUsers(ctx) {
  const users = userRepository.findAll();
  ctx.body = users;
}

async function getUserById(ctx) {
  const userId = ctx.params.id;
  const user = userRepository.findById(userId);

  if (!user) {
    ctx.status = 404;
    ctx.body = { error: "User not found" };
    return;
  }

  ctx.body = user;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
