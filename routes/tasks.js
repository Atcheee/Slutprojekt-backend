const { Router } = require("express");
const Auth = require("../middleware/auth");
const Validations = require("../validations");
const asyncHandler = require("../util/index");
const taskController = require("../controllers/taskController");
const imgController = require("../controllers/imgController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = new Router();

router.get("/", Auth.user, asyncHandler(taskController.get_tasks));

router.get("/images", Auth.user, asyncHandler(imgController.getTaskImage))

router.get("/:id/messages", Auth.user, asyncHandler(taskController.get_messages));

router.post("/", Auth.user, Validations.create_task, asyncHandler(taskController.create_task));

router.post("/:id/messages", Auth.user, asyncHandler(taskController.create_msg))

router.post("/:id/images", Auth.user, upload.single("image"), imgController.uploadImage);

router.patch("/:id", Auth.user, Validations.updateTask, asyncHandler(taskController.update_task));

router.patch("/:id/status", Auth.user, asyncHandler(taskController.update_taskStatus))

router.patch("/:id/images", Auth.admin, asyncHandler(imgController.deleteImage));

router.delete("/:id", Auth.admin, asyncHandler(taskController.deleteTask));

router.delete("/:id/messages", Auth.admin, asyncHandler(taskController.deleteMsg));

module.exports = router;
