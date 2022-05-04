const routes = require("./routes");
const express = require("express");
const app = express();

require("dotenv").config();

// middleware
app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes.auth);
app.use("/api/tasks", routes.tasks);
app.use("/api/users", routes.users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
