const User = require("../models/user");

module.exports = {
  getAllUsers: async (req, res) => {
    if (req.user.role === "Admin" || req.user.role === "Worker") {
      const users = await User.findAll({});
      res.json(users);
    } else if (req.user.role === "Customer") {
      // create query that finds the Customers account
    }
  },
  getUser: async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (req.user.role == "Admin" || req.user.role == "Worker") {
      res.json(user);
    } else if (req.user.role === "Customer") {
      throw new Error(
        "You don't have access to see this page, contact an Admin if you're supposed to have access to this page."
      );
    }
  },
  getMe: async (req, res) => {
    const user = await User.findByPk(req.user.userId);
    res.json(user);
  },
  registerUser: async (req, res) => {
    if (req.user.role !== "Admin") {
      throw new Error("You don't have clearance to register a new user.");
    }

    const user = await User.create(req.body);
    res.json(user);
  },
  updateUser: async (req, res) => {
    if (req.user.role !== "Admin") {
      throw new Error("You don't have clearance to update users.");
    }

    const user = await User.findByPk(req.params.id);
    if (user.role == "Admin") {
      throw new Error("An Admin cannot be updated");
    }
    user.update(req.body);
    res.json(user);
  },
};
