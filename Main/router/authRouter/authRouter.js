const router = require("express").Router();
const UserController = require("../../controllers/userController")
const UserValidator = require("../../validation/userValidationRouter")
const AuthMiddleware = require("../../middlewares/authMiddleware")
const RefreshTokenMiddleware = require("../../middlewares/refreshTokenMiddleware")

router.route("/signup").post(UserValidator.register,  UserController.registration);
router.route("/login").post(AuthMiddleware, RefreshTokenMiddleware, UserController.login);
router.route("/logout").get(UserController.logout);

module.exports = router;
