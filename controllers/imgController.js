const Task = require("../models/task");
const path = require("path");
const { Forbidden, Unauthorized } = require("../error");

module.exports = {
  getTaskImage: async (req, res) => {
    if (
      !req.user.user_role == "Admin" ||
      !req.user.user_role == "Worker" ||
      !req.user.user_role == "Worker"
    ) {
      throw new Unauthorized();
    }
    getImage = await Task.findAll({
      attributes: ["task_images"],
      where: { user_id: req.user.user_id },
    });
    res.json(getImage);
  },
  uploadImage: async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (req.user.user_role == "Customer") {
      throw new Forbidden();
    }

    if (req.user.user_role == "Admin" || req.user.user_role == "Worker") {
      await task.update({ task_images: req.file.filename }, { where: { id } });
      res.json(
        "Image added successfully. Go to http://localhost:8080/" +
          req.file.filename +
          " to see the updated image."
      );
    }
  },
};
