const { Router } = require("express");
const Auth = require("../middleware/auth");
const Validations = require("../validations");
const userController = require("../controllers/userController");
const asyncHandler = require("../util/index");

const router = new Router();
// swagger
/**
 * @swagger
 *  components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The users email address.
 *         role:
 *           type: string
 *           description: The users role.
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *       example:
 *          username: Customer1
 *          email: Customer1@gmail.com
 *          role: Customer
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API
 */

/**
 * @swagger
 * path:
 *  /api/users/:
 *    get:
 *      summary: Get users
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      responses:
 *        '200':
 *          description: Get users was successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/User'
 */

router.get("/", Auth.user, asyncHandler(userController.getAllUsers));

router.get("/:id", Auth.user, asyncHandler(userController.getUser));

router.get("/me", Auth.user, asyncHandler(userController.getMe));

router.post(
	"/",
	Auth.user,
	Validations.registerUser,
	asyncHandler(userController.registerUser)
);

router.patch("/:id", Auth.user, asyncHandler(userController.updateUser));

router.delete("/:id", Auth.admin, asyncHandler(userController.deleteUser));

module.exports = router;
