const User = require("../models/user");
const Messages = require("../models/message");
const Task = require("../models/task");

(async () => {
  await User.bulkCreate([
    {
      user_name: "Admin",
      user_email: "Admin@gmail.com",
      user_password: "$2a$10$QlPVUv/Dw.uDSH4arcAXMukOOX3hcfLTxkmhD3blGJfoy6VA8wEKi",
      user_role: "Admin",
    },
    {
      user_name: "Worker",
      user_email: "Worker@gmail.com",
      user_password: "$2a$10$LmAKWhMjRHz7/csohTMWWOfLVn/Rx9F55ju0pZopojW.wvSAvgfyO",
      user_role: "Worker",
    },
    {
      user_name: "Customer",
      user_email: "Customer@gmail.com",
      user_password: "$2a$10$ePDSS35rt72w6i8L7EXFL.Zk/AArLWUy7Ggp2Go8jbivBDtnRy.02",
    },
  ]);

  await Task.bulkCreate([
    {
      task_subject: "Toilet broken",
      task_content: "Pls fix ty",
      task_status: "In process",
      task_images:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2F6equcq%2Fa_random_cute_puppy_appeared%2F&psig=AOvVaw2D0tQEe0QpzeOOH2_uyQk_&ust=1651579058519000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOi2yMzhwPcCFQAAAAAdAAAAABAD",
      user_id: "3",
    },
    {
      task_subject: "Sink broken",
      task_content: "Thanks for fixing it",
      task_status: "Done",
      task_images:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2F6equcq%2Fa_random_cute_puppy_appeared%2F&psig=AOvVaw2D0tQEe0QpzeOOH2_uyQk_&ust=1651579058519000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOi2yMzhwPcCFQAAAAAdAAAAABAD",
      user_id: "4",
    },
  ]);
})();
