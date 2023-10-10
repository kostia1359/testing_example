const { User } = require('../domain');

class UserRepository {
  constructor() {
    this.users = [];
  }

  createUser({ id, name, email, money }) {
    const newUser = new User(id, name, email, money);
    this.users.push(newUser);
    return newUser;
  }

  findById(userId) {
    return this.users.find(user => user.id === userId);
  }

  findAll() {
    return this.users;
  }

  clear() {
    this.users = [];
  }
}

module.exports = new UserRepository();
