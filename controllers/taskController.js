const Task = require("../models/task");
const Messages = require("../models/message");

module.exports = {
  get_tasks: async (req, res) => {
    console.log(req.user.user_role);
    if (req.user.user_role == "Admin") {
      getTasks = await Task.findAll({});
    }
    if (req.user.user_role == "Worker") {
      console.log(req.user.user_id);
      getTasks = await Task.findAll({
        where: { worker_id: req.user.user_id },
      });
    }
    if (req.user.user_role == "Customer") {
      getTasks = await Task.findAll({
        where: { user_id: req.user.user_id },
      });
      if (!getTasks.length > 0) {
        res.json("This customer doesn't have any tasks yet.");
      }
    }
    res.json(getTasks);
  },
  create_task: async (req, res) => {
    if (req.user.user_role == "Customer") {
      throw new Error("You don't have access to create a task.");
    }
    if (req.user.user_role == "Admin" || req.user.user_role == "Worker") {
      const task = await Task.create(req.body);
      res.json("Task successfully created: " + task.task_subject);
    }
  },
  update_task: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (req.user.user_role == "Customer") {
      throw new Error("You don't have access to update a task");
    }

    await task.update(req.body, { where: { id } });
    res.json(
      "Task updated successfully: " +
        task.task_subject +
        " updated by " +
        req.user.user_name
    );
  },
  get_messages: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (
      req.user.user_role == "Customer" &&
      task.customer_id != req.user.user_id
    ) {
      throw new Error("You don't have access to view this page.");
    }
    if (req.user.user_role == "Worker" && task.worker_id != req.user.user_id) {
      throw new Error("You don't have access to view this page.");
    }
    const messages = await Messages.findAll({ where: { task_id: id } });
    res.json(messages);
  },

  create_msg: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    const msg = req.body.msg;
    const user_id = req.user.user_id;

    try {
      if (req.user.user_role == "Customer" && task.user_id != req.user.user_id) {
        throw new Error("You don't have access to create a new msg here.");
      }
      if (req.user.user_role === "Worker" || req.user.user_role === "Admin") {
        const message = await Messages.create({ msg, user_id, task_id: id });
        res.json("Message successfully created: " + message.msg);
      } 
    } catch (error) {
      throw new Error("You don't have access to create a new msg here.");
    }
    
  },
  update_taskStatus: async function (req, res) {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (req.user.user_role == "Customer") {
      throw new Error("You don't have access to update a task");
    }
    if (req.user.user_role == "Worker" || req.user.user_role == "Admin") {
      await task.update(req.body, { where: { id } });
      res.json(
        "Task status updated successfully. This task is now: " +
          task.task_status
      );
    }
  },
  deleteTask: async (req, res) => {
    if (!req.user.user_role == "Admin") {
      throw new Error("Only admins can delete tasks.");
    }
    if (req.user.user_role === "Admin") {
      const task = await Task.findByPk(req.params.id);
      if (!task) {
        res.json("No task was found");
      }
      if (task) {
        await Task.destroy({ where: { task_id: req.params.id } });
        res.json("Task got deleted successfully.");
      }
    }
  },
  deleteImage: async (req, res) => {
    if (!req.user.user_role == "Admin") {
      throw new Error("Only admins can delete images.");
    }
    if (req.user.user_role === "Admin") {
      const image = await Task.findByPk(req.params.id);
      if (!image) {
        res.json("No image was found");
      }
      if (image) {
        await Task.update({task_images: null},{ where: { task_id: req.params.id } });
        res.json("Image got deleted successfully.");
      }
    }
  },
  deleteMsg: async (req, res) => {
    if (!req.user.user_role == "Admin") {
      throw new Error("Only admins can delete messages.");
    }
    if (req.user.user_role === "Admin") {
      const message = await Messages.findByPk(req.params.id);
      if (!message) {
        res.json("No message was found");
      }
      if (message) {
        await Messages.destroy({ where: { task_id: req.params.id } });
        res.json("Message got deleted successfully.");
      }
    }
  }
};
