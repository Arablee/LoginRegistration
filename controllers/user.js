const userService = require("../services/userServices")
const winston = require("../logger/logger")

class UserController {
    async registration(req, res, next) {
        try {
            winston.debug("userController.registration -- start");
            const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                city,
                zone,
                street,
                home,
                countryCode,
                operatorCode,
                number,
            } = req.body;

            const userData = await userService.registration(
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                city,
                zone,
                street,
                home,
                countryCode,
                operatorCode,
                number
            );
            winston.debug("userController.registration -- success");
            return res.status(201).json(userData);
        } catch (e) {
            next(e);
        }
    }


    async login(req, res, next) {
        try {
            winston.debug("userController.login - start");
            const { email, password, rememberMe } = req.body;
            if (rememberMe) {
                const rememberMeToken = await userService.rememberMe(email, password);
                res.cookie("x-alfa-remember", rememberMeToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });

            }
            const rememberMeCookie = req.cookies.remember;
            if (rememberMeCookie) {
                const rememberMeUser = await userService.verifyRememberMe(
                    rememberMeCookie
                );
                const userData = await userService.login(
                    rememberMeUser.email,
                    rememberMeUser.password
                );
                res.cookie("x-alfa-authorization", userData.accessToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.cookie("x-alfa-refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                winston.debug("userController.login - rememberMe - success");
                return res.status(200).json(userData);
            }
            const userData = await userService.login(email, password);
            res.cookie("x-alfa-authorization", userData.accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.cookie("x-alfa-refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            winston.debug("userController.login - success");
            delete userData.accessToken;
            delete userData.refreshToken;
            return res.status(200).json(userData.user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController;