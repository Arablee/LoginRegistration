const router = require("express").Router();
const UserController = require("../../controllers/userController")

router.route("/signup").post(UserController.registration);
router.route("/login").get().post(UserController.login);
//router.route("/logout").get(UserController.logout);

module.exports = router;
