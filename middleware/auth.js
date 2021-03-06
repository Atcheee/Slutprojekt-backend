const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports = {
  async user(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);

      req.user = user;

      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized token" });
    }
  },
  async admin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      if (user.user_role != "Admin") {
        res.status(401).send({ error: "Unauthorized token" });
      }

      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
};
