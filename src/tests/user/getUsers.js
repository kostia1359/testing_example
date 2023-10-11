const supertest = require("supertest");

const getUsers = async (app) => {
  const getUsersResponse = await supertest(app).get("/users").expect(200);

  return getUsersResponse.body;
};

module.exports = getUsers;
