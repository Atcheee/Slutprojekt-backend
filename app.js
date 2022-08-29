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

// swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Insert Awesome Title",
			version: "1.0.1",
			contact: {
				name: "Me",
			},
		},
		servers: [
			{
				url: "http://localhost:8081",
			},
		],
	},
	apis: ["./routes/*.js"],
};

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
const specs = swaggerJsDoc(swaggerOptions);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
