const express = require("express");
var router = express.Router();

var clientsController = require("../controllers/clients.controller");

router.get("/", clientsController.getAll);

router.get("/:id", clientsController.getSpecific);

router.post("/", clientsController.create);

router.put("/:id", clientsController.put);

router.delete("/:id", clientsController.delete);

module.exports = router;
