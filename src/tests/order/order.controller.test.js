const { v4: uuidv4 } = require("uuid");

const app = require("../../server");

const { buildUser, buildItem, buildOrder } = require("../builders");

const createUser = require("../user/createUser");
const createItem = require("../item/createItem");
const createOrder = require("./createOrder");
const createInvalidOrder = require("./createInvalidOrder");

describe("Order Controller", () => {
  it("Should not create invalid order", async () => {
    await createInvalidOrder(app, buildOrder.bind(null, uuidv4(), uuidv4()));
  });

  it("Should create order", async () => {
    const user = await createUser(app, buildUser.bind(null, 10_000));
    const item = await createItem(app, buildItem.bind(null, user.id));

    await createOrder(app, buildOrder.bind(null, user.id, item.id));
  });
});
