require("dotenv").config()
const jwt = require("jsonwebtoken")

const TokenService = require("../services/tokenService")


const authMiddleware = async (req, res, next) => {

    try {
        const accessToken = req.cookies["x-auth-access"]
        const userData = await TokenService.validateAccessToken(accessToken);
        if (!userData)
            return next()
        req.user = userData
        next()
    }catch (e) {
        next();
    }
}

module.exports = authMiddleware;