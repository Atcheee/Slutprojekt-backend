const {
  check,
  body,
  validationResult,
  query,
  header,
} = require("express-validator");

const validator = (validators) => async (req, res, next) => {
  for (let validering of validerings) {
    const result = await validering.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};

module.exports = {
  register: validator([
    check("name").exists().withMessage("Name missing"),
    check("email").exists().withMessage("Email missing"),
    check("password").exists().withMessage("Password missing"),
  ]),
};
