const authController = require("../controllers/AuthController");
const Auth = require("../middleware/auth");
const Validations = require("../validations");
const asyncHandler = require("../util/index");

const { Router } = require("express");

const router = new Router();

router.post("/auth", Validations.login, asyncHandler(authController.authenticate));

module.exports = router;
