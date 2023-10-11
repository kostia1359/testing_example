const { faker } = require("@faker-js/faker");

const buildOrder = (userId, itemId) => ({
  userId,
  itemId,
  quantity: faker.finance.amount({ min: 0, max: 10, dec: 0 }),
});

module.exports = buildOrder;
