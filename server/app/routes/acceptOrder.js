const express = require("express");

const order = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(order.findAllOrders);

router.route("/:userId/:orderId").get(order.acceptOrder);

module.exports = router;
