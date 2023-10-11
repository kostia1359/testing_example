const { User } = require("../domain");
const { v4: uuidv4 } = require("uuid");

class UserRepository {
  constructor() {
    this.users = [];
  }

  createUser({ name, email, money }) {
    const id = uuidv4();

    const newUser = new User(id, name, email, money);
    this.users.push(newUser);
    return newUser;
  }

  findById(userId) {
    return this.users.find((user) => user.id === userId);
  }

  findAll() {
    return this.users;
  }

  clear() {
    this.users = [];
  }
}

module.exports = new UserRepository();
