const express = require("express");

const info = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(info.findAllOfUser).post(info.updateInfo);

module.exports = router;
