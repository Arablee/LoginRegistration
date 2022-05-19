const router = require("express").Router();
const UserController = require("../../controllers/userController")
const UserValidator = require("../../validation/userValidationRouter")
const AuthMiddleware = require("../../middlewares/authMiddleware")

router.route("/signup").post(UserValidator.register,  UserController.registration);
router.route("/login").get().post(AuthMiddleware, UserController.login);
//router.route("/logout").get(UserController.logout);

module.exports = router;
