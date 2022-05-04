const authController = require("../controllers/AuthController");
const imgController = require("../controllers/imgController");
const Validations = require("../validations");
const asyncHandler = require("../util/index");
const fileUpload = require("express-fileupload");
const Auth = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const { Router } = require("express");
const router = new Router();

router.get("/", Auth.admin, imgController.getAllImages);

router.post("/", Auth.admin, upload.single("image"), imgController.uploadImage);

module.exports = router;
