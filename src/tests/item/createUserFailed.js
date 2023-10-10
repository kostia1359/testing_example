const supertest = require('supertest');
const { expect } = require('chai');


const createUserFailed = async (app, buildUser) => {
    const invalidUser = {
        ...buildUser(),
        email: 'test'
    }
   
    await supertest(app)
        .post('/users')
        .send(invalidUser)
        .expect(400);
}

module.exports = createUserFailed