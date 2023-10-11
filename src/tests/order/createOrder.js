const supertest = require("supertest");
const { expect } = require("chai");

const createOrder = async (app, buildOrder) => {
  const orderData = buildOrder();
  const createdOrderResponse = await supertest(app)
    .post("/orders")
    .send(orderData)
    .expect(201);

  const createdOrder = createdOrderResponse.body;

  expect(createdOrder.userId).to.equal(orderData.userId);
  expect(createdOrder.itemId).to.equal(orderData.itemId);
  expect(createdOrder.quantity).to.equal(orderData.quantity);

  const readCreatedOrderResponse = await supertest(app)
    .get(`/orders/${createdOrder.id}`)
    .expect(200);

  expect(readCreatedOrderResponse.body).to.deep.equal({
    ...orderData,
    id: createdOrder.id,
  });

  return readCreatedOrderResponse.body;
};

module.exports = createOrder;
