const authController = require("../controllers/AuthController");
const taskController = require("../controllers/taskController");
const Auth = require("../middleware/auth");
const Validations = require("../validations");

const { Router } = require("express");

const router = new Router();

router.post(
  "/register",
  Validations.register,
  // asyncHandler(authController.authenticate)
);

// router.get("tasks/:id", Auth.user, asyncHandler(UserController.getOne));
// router.destroy({ where: { id } }, Auth.user); // not sure if this works, need testing.

module.exports = router;
