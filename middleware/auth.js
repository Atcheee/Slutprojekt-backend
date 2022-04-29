const jwt = require("jsonwebtoken");

module.exports = {
  async admin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = jwt.verify(token, process.env.JWT_SECRET);

      if (user.role != "Admin") {
        throw new Forbidden();
      }

      req.user = user;

      next();
    } catch (err) {
      res.status(401).send({ err: "Unauthorized" });
    }
  },
};
