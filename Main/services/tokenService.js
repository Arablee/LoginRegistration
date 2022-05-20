const jwt = require("jsonwebtoken");
require("dotenv").config()
const refreshTokenModel = require("../models/refreshTokenModel")



class TokenService{

    async generateTokens(email){
        if (!email){
            throw new Error("ID ve ya Email tapilmadi")
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
            throw new Error("Xeta")
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
            throw new Error("Xeta")
        }

        try{
            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return user;
        }catch (e) {
            throw e;
        }
    }

    async saveRefreshToken(id, refreshToken){
        try {
            console.log(refreshToken)
            const saveToken = await refreshTokenModel.create({refreshToken, id})
            return saveToken;
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