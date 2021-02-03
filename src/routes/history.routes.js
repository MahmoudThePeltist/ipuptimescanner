const express = require("express");
var router = express.Router();

var clientsHistoryController = require("../controllers/history.controller");

router.get("/", clientsHistoryController.getAll);

router.get("/:id", clientsHistoryController.getSpecific);

module.exports = router;
