const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

    const hash = bcrypt.hashSync(req.body.user_password, 10);

    const user = await User.create({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_password: hash,
      user_role: req.body.user_role,
    });
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
  deleteUser: async (req, res) => {
    if (!req.user.user_role == "Admin") {
      throw new Error("Only admins can delete users.");
    }
    if (req.user.user_role === "Admin") {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.json("No user with this user_id was found");
      }
      if (user) {
        await User.destroy({ where: { user_id: req.params.id } });
        res.json("User got deleted successfully.");
      }
    }
  },
};
