const User = require("../models/user");

module.exports = {
  getAllUsers: async (req, res) => {
    if (req.user.user_role === "Admin" || req.user.user_role === "Worker") {
      const users = await User.findAll({});
      res.json(users);
    } else if (req.user.user_role === "Customer") {
      const user = await User.findOne({ where: { user_id: req.user.user_id } });
      res.json(user);
    }
  },
  getUser: async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (req.user.user_role == "Admin" || req.user.user_role == "Worker") {
      res.json(user);
    } else if (req.user.user_role === "Customer") {
      throw new Error(
        "You don't have access to see this page, contact an Admin if you're supposed to have access to this page."
      );
    }
  },
  getMe: async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.json(user);
  },
  registerUser: async (req, res) => {
    if (req.user.user_role !== "Admin") {
      throw new Error("You don't have access to see this page.");
    }

    const user = await User.create(req.body);
    res.json(user);
  },
  updateUser: async (req, res) => {
    if (req.user.user_role !== "Admin") {
      throw new Error("You don't have clearance to update users.");
    }

    const user = await User.findByPk(req.params.id);
    if (user.user_role == "Admin") {
      throw new Error("An Admin cannot be updated");
    }
    user.update(req.body);
    res.json(user);
  },
};
