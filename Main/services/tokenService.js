const jwt = require("jsonwebtoken");
require("dotenv").config()
const refreshTokenModel = require("../models/refreshTokenModel")
const ApiError = require("../exceptions/apiError")



class TokenService{

    async generateTokens(email){
        if (!email){
            throw ApiError.BadRequest("Email tapilmadi")
        }
        try {
            const accessToken = jwt.sign({email}, process.env.JWT_USER_SECRET, {
                expiresIn: "3d"
            })
            const refreshToken = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "3d"
            })

            return {accessToken, refreshToken}
        }catch (error){
            throw error
        }
    }

    async validateAccessToken(accessToken){
        if(!accessToken){
            throw ApiError.BadRequest("Access token tapilamdi")
        }
        try{
            const user = jwt.verify(accessToken, process.env.JWT_USER_SECRET)
            return user;
        }catch (e) {
            throw e;
        }
    }

    async validateRefreshToken(refreshToken){

        if(!refreshToken){
            throw ApiError.BadRequest("Refresh token tapilmadi")
        }
        try{
            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return user;
        }catch (e) {
            throw null;
        }
    }

    async saveRefreshToken(userId, refreshToken){
        try {
            return await refreshTokenModel.create({userId: userId, refreshToken: refreshToken});
        }catch (e) {
            throw e;
        }
    }

    async removeRefreshToken(userID){
        try {
            return await refreshTokenModel.deleteOne({ userID });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TokenService();