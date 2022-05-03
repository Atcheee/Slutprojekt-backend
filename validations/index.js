const {
  check,
  body,
  validationResult,
  query,
  header,
} = require("express-validator");

const validator = (validators) => async (req, res, next) => {
  for (let validering of validators) {
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
  login: validator([
    check("user_email").exists().withMessage("Missing email"),
    check("user_password").exists().withMessage("Missing password"),
    check("user_role").exists().withMessage("Missing role"),
  ]),
  registerUser: validator([
    check("user_name").exists().withMessage("Name missing"),
    check("user_email").exists().withMessage("Email missing"),
    check("user_password").exists().withMessage("Password missing"),
    check("user_role").exists().withMessage("Role missing"),
  ]),
  create_task: validator([
    check("task_subject").exists().withMessage("Missing task name"),
    check("task_content").exists().withMessage("Missing task description"),
    check("task_status").exists().withMessage("Missing task status"),
    check("task_images").exists().withMessage("Missing task image"),
    check("customer_id").exists().withMessage("Missing client id"),
    check("worker_id").exists().withMessage("Missing worker id"),
  ]),
  updateTask: validator([
    check("taskStatus")
      .exists()
      .isIn(["pending", "in progress", "completed"])
      .withMessage("Missing task status"),
  ]),
};
