const express = require("express");
var router = express.Router();

var clientsHistoryController = require("../controllers/clients_history.controller");

router.get("/", clientsHistoryController.getAll);

router.get("/:id", clientsHistoryController.getSpecific);

module.exports = router;
