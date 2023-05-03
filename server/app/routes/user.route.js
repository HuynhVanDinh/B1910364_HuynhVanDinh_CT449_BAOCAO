const express = require("express");

const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/register").post(user.create);
router.route("/login").post(user.login);
router.route("/loginadmin").post(user.loginadmin);
router.route("/logout").post(user.logout);
router.route("/").get(user.findAll);

module.exports = router;
