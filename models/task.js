const db = require("../database/connection");
const { DataTypes } = require("sequelize");
const { InvalidUserCredentials, Unauthorized } = require("../error");

require("dotenv").config();

const Task = db.define("Task", {
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task_subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_status: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ["Pending", "Done"],
    defaultValue: "Pending",
  },
  task_images: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Task;
