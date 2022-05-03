const db = require("../database/connection");
const { DataTypes } = require("sequelize");

require("dotenv").config();

const Messages = db.define("Messages", {
  msg_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  msg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Messages;
