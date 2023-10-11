const supertest = require("supertest");

const createInvalidOrder = async (app, buildOrder) => {
  const orderData = buildOrder();
  await supertest(app).post("/orders").send(orderData).expect(400);
};

module.exports = createInvalidOrder;
