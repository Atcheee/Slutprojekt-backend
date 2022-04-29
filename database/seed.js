const User = require("../models/user");

(async () => {
  await User.create({
    user_name: "Admin John",
    user_email: "admin@gmail.com",
    user_password: "password",
    user_role: "Admin",
  });
  await User.create({
    user_name: "Tom",
    user_email: "Tom@gmail.com",
    user_password: "password",
  });
})();
