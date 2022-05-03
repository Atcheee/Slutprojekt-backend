const { Router } = require("express");
const Auth = require("../middleware/auth");
const Validations = require("../validations");
const asyncHandler = require("../util/index");
const taskController = require("../controllers/taskController");

const router = new Router();

router.get("/", Auth.user, asyncHandler(taskController.get_tasks));

router.post("/", Auth.user, Validations.create_task, asyncHandler(taskController.create_task));

router.patch("/:id", Auth.user, Validations.updateTask, asyncHandler(taskController.update_task));

router.get("/:id/messages", Auth.user, asyncHandler(taskController.get_messages));

router.post("/:id/messages", Auth.user, asyncHandler(taskController.create_msg))

module.exports = router;
