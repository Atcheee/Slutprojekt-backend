const db = require("../database/connection");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { InvalidUserCredentials, Unauthorized } = require("../errors");

require("dotenv").config();

const User = db.define(
  "User",
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists!",
      },
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
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new InvalidUserCredentials();
  }

  const passwordCheck = bcrypt.compareSync(password, user.password);

  if (passwordCheck) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
  } else {
    throw new InvalidUserCredentials();
  }
};

module.exports = User;
