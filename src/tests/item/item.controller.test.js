const { v4: uuidv4 } = require("uuid");

const app = require("../../server");

const { buildUser, buildItem } = require("../builders");

const createUser = require("../user/createUser");
const createItem = require("./createItem");
const createItemWithoutUser = require("./createItemWithoutUser");

describe("Item Controller", () => {
  it("Should not create item without user", async () => {
    await createItemWithoutUser(app, buildItem.bind(null, uuidv4()));
  });

  it("Should create item", async () => {
    const user = await createUser(app, buildUser);
    await createItem(app, buildItem.bind(null, user.id));
  });
});
