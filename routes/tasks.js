const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const Auth = require("../middleware/auth");
const Validations = require("../validations");

const { Router } = require("express");

const router = new Rounter();

// router.get("/", Auth.user, asyncHandler(taskController.getTasks));
