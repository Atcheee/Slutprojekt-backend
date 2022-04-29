// const authController = require("../controllers/authController");
const { Router } = require("express");
const Auth = require("../middleware/auth");
const Validations = require("../validations");

const router = new Router();

// router.get("/") ;

router.get("/", (req, res) => {
  res.send("jsuheglusheg")
});

module.exports = router;