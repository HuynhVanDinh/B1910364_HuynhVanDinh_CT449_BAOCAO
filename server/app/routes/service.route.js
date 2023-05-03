const express = require("express");

const service = require("../controllers/service.controller");

const router = express.Router();

router.route("/").get(service.findAll).post(service.create);
// .delete(service.deleteAll);

router
  .route("/:id")
  .get(service.findOne)
  .put(service.update)
  .delete(service.delete);

module.exports = router;
