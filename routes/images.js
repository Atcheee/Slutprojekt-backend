const authController = require("../controllers/AuthController");
const imgController = require("../controllers/imgController");
const Validations = require("../validations");
const asyncHandler = require("../util/index");
const fileUpload = require("express-fileupload");
const Auth = require("../middleware/auth");

const { Router } = require("express");
const router = new Router();

router.get("/", Auth.admin, imgController.getAllImages);

router.post("/", Auth.admin, imgController.uploadImage);

module.exports = router;
