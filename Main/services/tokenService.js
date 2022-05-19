const jwt = require("jsonwebtoken");
require("dotenv").config()


class TokenService{

    async generateTokens(id, email){

        if (!id || !email){
            throw new Error("ID ve ya Email tapilmadi")
        }
        try {
            const accessToken = jwt.sign({id, email}, process.env.JWT_USER_SECRET, {
                expiresIn: "3d"
            })
            const refreshToken = jwt.sign({id, email}, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "3d"
            })

            return {accessToken, refreshToken}
        }catch (error){
            throw error
        }
    }

    async validateAccessToken(token){

        if(!token){
            throw new Error("Xeta")
        }
        try{
            const user = jwt.verify(token, process.env.JWT_USER_SECRET)

            return user;
        }catch (e) {
            throw e;
        }

    }


}

module.exports = new TokenService();