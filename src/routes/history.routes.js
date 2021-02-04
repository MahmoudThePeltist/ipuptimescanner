const express = require("express");
const { JWTAuth } = require("../services/jwt.validator");
var router = express.Router();

var clientsHistoryController = require("../controllers/history.controller");

router.get("/", [JWTAuth], clientsHistoryController.getAll);

router.get("/:id", [JWTAuth], clientsHistoryController.getSpecific);

module.exports = router;
