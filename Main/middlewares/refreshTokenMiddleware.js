require("dotenv").config()
const userService = require("../services/userService")
const ApiError = require("../exceptions/apiError")


    const refreshTokenMiddleware = async (req, res, next) => {
        try {

            if (req.user) return next();
            const refreshToken = req.cookies["x-auth-refresh"]
            const newUserData = await userService.refresh(refreshToken)
            if (!newUserData) {
                throw ApiError.BadRequest("Resfresh melumat tapilmadi")
            }

            res.cookie("x-social-auth", newUserData.accessToken, {
                httpOnly: true,
                maxAge: 5 * 60 * 1000,
            });

            req.user = newUserData.user;

            next();
        } catch (error) {
            next(error);
        }
    }

module.exports = refreshTokenMiddleware;