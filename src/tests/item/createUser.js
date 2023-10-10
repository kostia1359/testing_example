const supertest = require('supertest');
const { expect } = require('chai');


const createUser = async (app, buildUser) => {
    const userData = buildUser();
    const createdUserResponse = await supertest(app)
        .post('/users')
        .send(userData)
        .expect(201);

    const createdUser = createdUserResponse.body;

    expect(createdUser).to.have.property('id');
    expect(createdUser.name).to.equal(userData.name);
    expect(createdUser.email).to.equal(userData.email);
    expect(createdUser.money).to.equal(userData.money);

    const readCreatedUserResponse = await supertest(app)
        .get(`/users/${createdUser.id}`)
        .expect(200);

    expect(readCreatedUserResponse.body).to.deep.equal({
        ...userData,
        id: createdUser.id
    })
}

module.exports = createUser