const { errorHandler } = require("./index");
const { BaseError } = require("sequelize");

module.exports = {
  errorHandling(error, req, res, next) {
    if (error instanceof errorHandler) {
      res.status(error.errorCode).json({ error: error.message });
    } else if (error instanceof BaseError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof syntaxError) {
      res.status(400).json({ error: "JSON syntax error" });
    } else {
      console.error(error);
      res.status(500).json({
        error: "An error occurred, contact your administrator for help.",
      });
    }
  },
};
