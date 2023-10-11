const Router = require("koa-router");
const userController = require("./user.controller");
const itemController = require("./item.contoller");
const orderController = require("./order.controller");

const router = new Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);

router.post("/items", itemController.createItem);
router.get("/items", itemController.getItems);
router.get("/items/:id", itemController.getItemById);

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrderById);

module.exports = router;
