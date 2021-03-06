const routes = require("./routes");
const express = require("express");
const app = express();

require("dotenv").config();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes.auth);
app.use("/api/users", routes.users);
app.use("/api/tasks", routes.tasks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
