const User = require("../models/user");
const Messages = require("../models/message");
const Task = require("../models/task");

(async () => {
  await User.bulkCreate([
    {
      user_name: "Admin",
      user_email: "Admin@gmail.com",
      user_password: "Admin",
      user_role: "Admin",
    },
    {
      user_name: "Worker",
      user_email: "Worker@gmail.com",
      user_password: "Worker",
      user_role: "Worker",
    },
    {
      user_name: "User",
      user_email: "User@gmail.com",
      user_password: "User",
    },
  ]);

  await Task.bulkCreate([
    {
      task_subject: "Toilet broken",
      task_content: "Pls fix ty",
      task_status: "In process",
      task_images:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2F6equcq%2Fa_random_cute_puppy_appeared%2F&psig=AOvVaw2D0tQEe0QpzeOOH2_uyQk_&ust=1651579058519000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOi2yMzhwPcCFQAAAAAdAAAAABAD",
      customer_id: "1",
      worker_id: "2",
    },
    {
      task_subject: "Sink broken",
      task_content: "Thanks for fixing it",
      task_status: "Done",
      task_images:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2F6equcq%2Fa_random_cute_puppy_appeared%2F&psig=AOvVaw2D0tQEe0QpzeOOH2_uyQk_&ust=1651579058519000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOi2yMzhwPcCFQAAAAAdAAAAABAD",
      customer_id: "3",
      worker_id: "4",
    },
  ]);

  await Messages.bulkCreate([
    {
      msg: "random text random text random text random text ",
    },
    {
      msg: "bla bla bla bla bla bla ",
    },
  ]);
})();
