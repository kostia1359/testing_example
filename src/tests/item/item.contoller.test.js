const app = require('../../server');
const { expect } = require('chai');

const { buildUser } = require('../builders');
const {userRepository} = require('../../repositories');

const createUser = require('./createUser');
const createUserFailed = require('./createUserFailed')
const getUsers = require('./getUsers')

describe('User Controller', () => {
  it('Should not create user', async () => {
    await createUserFailed(app, buildUser);
  })

  it('Should create user', async () => {
    await createUser(app, buildUser);
  });

  it('Should count users', async () => {
    userRepository.clear();

    const createdUsers = await Promise.all([
      createUser(app, buildUser),
      createUser(app, buildUser),
      createUser(app, buildUser),
    ]);

    const users = await getUsers(app);
    
    expect(users.length).to.equal(createdUsers.length)
  })
});
