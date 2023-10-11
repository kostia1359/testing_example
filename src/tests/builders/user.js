const { faker } = require("@faker-js/faker");

const buildUser = (money) => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  money: money || faker.finance.amount({ min: 0, max: 1000, dec: 0 }),
});

module.exports = buildUser;
