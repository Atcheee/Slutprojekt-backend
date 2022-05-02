const db = require("../database/connection");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { InvalidUserCredentials, Unauthorized } = require("../errors");

require("dotenv").config();

const User = db.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.STRING,
      enum: ["Admin", "Worker", "Customer"],
      defaultValue: "Customer",
      allowNull: false,
    },
  },
  {
    // hooks: {
    //   beforeCreate(instance, options) {
    //     instance.password_hash = bcrypt.hashSync(instance.password_hash);
    //   },
    // },
  }
);

User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { user_email: email } });

  if (!user) {
    throw new Error("User not found!");
  }

  if (user.user_password == password) {
    const payload = {
      user_id: user.user_id,
      user_name: user.user_name,
      user_email: user.user_email,
      user_role: user.user_role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
  } else {
    throw new Error("Password isn't correct, try again!");
  }
};

module.exports = User;
