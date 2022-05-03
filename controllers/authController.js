const User = require("../models/user");

module.exports = {
  async authenticate(req, res) {
    const token = await User.authenticate(req.body.user_email, req.body.user_password);
    res.json(token);
  },
};
