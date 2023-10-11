const { faker } = require("@faker-js/faker");

const buildItem = (createdBy) => ({
  name: faker.commerce.productName(),
  price: faker.finance.amount({ min: 1, max: 100, dec: 0 }),
  createdBy,
});

module.exports = buildItem;
