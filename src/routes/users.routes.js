const express = require("express");
const { JWTAuth } = require("../services/jwt.validator");
var router = express.Router();

var usersController = require("../controllers/users.controller");


router.post("/login", usersController.login);

router.get("/", [JWTAuth], usersController.getAll);

router.get("/:id", [JWTAuth], usersController.getSpecific);

router.post("/", [JWTAuth], usersController.create);

router.put("/:id", [JWTAuth], usersController.put);

router.delete("/:id", [JWTAuth], usersController.delete);

module.exports = router;
