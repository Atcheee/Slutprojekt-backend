const {
  check,
  body,
  validationResult,
  query,
  header,
} = require("express-validator");

module.exports = {
  register: validator([
    check("name").exists().withMessage("Name missing"),
    check("email").exists().withMessage("Email missing"),
    check("password").exists().withMessage("Password missing"),
  ]),
};
