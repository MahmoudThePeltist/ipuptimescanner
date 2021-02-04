const express = require("express");
const { JWTAuth } = require("../services/jwt.validator");
var router = express.Router();

var clientsController = require("../controllers/clients.controller");

router.get("/", [JWTAuth], clientsController.getAll);

router.get("/:id", [JWTAuth], clientsController.getSpecific);

router.post("/", [JWTAuth], clientsController.create);

router.put("/:id", [JWTAuth], clientsController.put);

router.delete("/:id", [JWTAuth], clientsController.delete);

module.exports = router;
