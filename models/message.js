const db = require("../database/connection");
const { DataTypes } = require("sequelize");
const { InvalidUserCredentials, Unauthorized } = require("../errors");

require("dotenv").config();

const Message = db.define("Message", {
  msg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
