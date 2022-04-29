const sequalize = require("./connection");

const User = require("../models/user");
const Task = require("../models/task");
const Message = require("../models/message");

const db = require('./connection')

User.hasMany(Task,);
Task.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(Task);

db.sync();
