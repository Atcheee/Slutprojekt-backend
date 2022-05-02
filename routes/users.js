const { Router } = require("express");
const Auth = require("../middleware/auth");
const Validations = require("../validations");
const userController = require("../controllers/userController");
const asyncHandler = require("../util/index");

const router = new Router();

router.get("/", Auth.user, asyncHandler(userController.getAllUsers));

router.get("/:id", Auth.user, asyncHandler(userController.getUser));

router.get("/me", Auth.user, asyncHandler(userController.getMe));

router.post("/", Auth.user, Validations.registerUser, asyncHandler(userController.registerUser));

router.patch("/:id", Auth.user, asyncHandler(userController.updateUser));

module.exports = router;
