const User = require("../models/user");
const Task = require("../models/task");
const Message = require("../models/message");

const db = require("./connection");

User.hasMany(Task);
Task.belongsTo(User);

Message.belongsTo(User, { foreignKey: "user_id" });
Message.belongsTo(Task, { foreignKey: "task_id" });

db.sync();
