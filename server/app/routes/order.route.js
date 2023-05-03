const express = require("express");

const order = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(order.findAllOrdersOfUser).post(order.addOrder);

router.route("/:id").post(order.addOrder1);

router.route("/getOrder").get(order.getOrderUnconfirm);

module.exports = router;
