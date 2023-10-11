const supertest = require("supertest");

const createItemWithoutUser = async (app, itemBuilder) => {
  const itemData = itemBuilder();

  await supertest(app).post("/items").send(itemData).expect(400);
};

module.exports = createItemWithoutUser;
