const router = require("express").Router();
const UserController = require("../../controllers/userController")
const UserValidator = require("../../validation/userValidationRouter")


router.route("/signup").post(UserValidator.register,  UserController.registration);
router.route("/login").post(UserController.login);
router.route("/logout").get(UserController.logout);

module.exports = router;
