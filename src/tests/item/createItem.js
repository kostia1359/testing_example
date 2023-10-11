const supertest = require("supertest");
const { expect } = require("chai");

const createItem = async (app, itemBuilder) => {
  const itemData = itemBuilder();
  const createdItemResponse = await supertest(app)
    .post("/items")
    .send(itemData)
    .expect(201);

  const createdItem = createdItemResponse.body;

  expect(createdItem).to.have.property("id");
  expect(createdItem.name).to.equal(itemData.name);
  expect(createdItem.price).to.equal(itemData.price);
  expect(createdItem.createdBy).to.equal(itemData.createdBy);

  const readCreatedItemResponse = await supertest(app)
    .get(`/items/${createdItem.id}`)
    .expect(200);

  expect(readCreatedItemResponse.body).to.deep.equal({
    ...itemData,
    id: createdItem.id,
  });

  return readCreatedItemResponse.body;
};

module.exports = createItem;
