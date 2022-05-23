const UserService = require("../services/userService")
const TokenService = require("../services/tokenService")


class UserController{

    async registration(req, res, next){

        const {firstName, lastName, email, password, confirmPassword} = req.body;

        try {
            const user = await UserService.registration(firstName, lastName, email, password, confirmPassword);
            res.status(201).json(user);
        }catch (error) {
            next(error)
        }
    }


    async login(req, res, next){
        const {email, password} = req.body

        try{
            const user = await UserService.login(email, password);
            const tokenData = await TokenService.generateTokens(email)
            await TokenService.saveRefreshToken(user.id, tokenData.refreshToken)
            req.user = user
            res.cookie("x-auth-access", tokenData.accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            res.cookie("x-auth-refresh", tokenData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            res.status(200).json(user)
        }catch (error) {
            next(error)
        }
    }


    async logout(req, res, next){
        try {
            const refreshToken = req.cookies["x-auth-refresh"];

            await UserService.logout(refreshToken);

            res.clearCookie("x-auth-access");
            res.clearCookie("x-auth-refresh");

            res.status(200).send("User logged out successfully!");
        }catch (e) {
            next(e)
        }
    }

    async updateUserPassword(req, res, next){
        try {
            const {oldPassword, newPassword, confirmNewPassword} = req.body
            const email = req.user.email
            await UserService.updateUserPassword(email, oldPassword, newPassword, confirmNewPassword);
            res.status(200).send("Password successfully changed")
        }catch (e) {
            next(e)
        }
    }

    async resetPassword(req, res, next){
        try {
            Math.floor(100000 + Math.random() * 900000);

        }catch (e){
            next(e);
        }

    }

}

module.exports = new UserController();