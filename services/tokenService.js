const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');
const bcrypt = require('bcrypt');
const winston = require("../logger/logger");
const ApiError = require('../exceptions/apiError');


class TokenService{

    generateRememberMeToken(email, password) {
        winston.debug('tokenService.generateRememberMeToken -- start');
        if (!email && !password) {
            winston.warn('tokenService.generateRememberMeToken -- null param');
            throw new ApiError.GeneralException("Məlumatları daxil edin !");
        }
        try {
            const activationToken = jwt.sign({
                email: email,
                password: password
            }, process.env.jwt_remember_me, {expiresIn: '30d'});
            winston.debug('tokenService.generateRememberMeToken -- success');
            return activationToken;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TokenService;