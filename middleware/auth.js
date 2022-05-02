const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async user(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;

      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
  async admin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      if (user.user_role != "Admin") {
        res.status(401).send({ error: "You are not an Admin" });
      }

      next();
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  },
};
