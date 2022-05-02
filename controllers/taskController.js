const Task = require("../models/task");

module.exports = {
  get_tasks: async (req, res) => {
    if (req.user.user_role == "Admin") {
      all_Tasks = await Task.findAll();
    }
    if (req.user.user_role == "Worker") {
      all_Tasks = await Task.findAll({ where: { worker_id: req.user.user_id } });
    }
    if (req.user.user_role == "Customer") {
      all_Tasks = await Task.findAll({ where: { customer_id: req.user.user_id } });
    }
    res.json(all_Tasks);
  },
  create_task: async (req, res) => {
    if (req.user.user_role == "Customer") {
      throw new Error("You are not authorized to create a task");
    }
    if (req.user.user_role == "Admin" || req.user.user_role == "Customer") {
      const task = await Task.create(req.body);
      res.json("Task created successfully: " + task.task_subject);
    }
  },
  update_task: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (req.user.user_role == "Customer") {
      throw new Error("You are not authorized to update a task");
    }

    await task.update(req.body, { where: { id } });
    res.json(
      "Task updated successfully: " +
        task.task_subject +
        " updated by " +
        req.user.user_name
    );
  },
};
