const express = require("express");
var router = express.Router();

var usersController = require("../controllers/users.controller");


router.post("/login", usersController.login);

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSpecific);

router.post("/", usersController.create);

router.put("/:id", usersController.put);

router.delete("/:id", usersController.delete);

module.exports = router;
