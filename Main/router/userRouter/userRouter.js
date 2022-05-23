const router = require("express").Router();
const AuthMiddleware = require("../../middlewares/authMiddleware");
const RefreshTokenMiddleware = require("../../middlewares/refreshTokenMiddleware");
const UserController = require("../../controllers/userController");


router.use(AuthMiddleware, RefreshTokenMiddleware)

router.post('/change-password', UserController.updateUserPassword)

module.exports = router;