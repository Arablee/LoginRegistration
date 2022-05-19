const userModel = require("../models/user");
const ApiError = require("../exceptions/apiError")
const winston = require("../logger/logger")
const addressModel = require("../models/address")
const RoleModel = require("../models/role")
const phoneModel = require("../models/phone")
const {userType} = require("../enums/enums");



class userRepository{
    async getUserById(id) {
        try
        {
            const findUser = await userModel.findById(id);
            return findUser;
        } catch (error)
        {
            throw error;
        }
    }

    async createUser(
        firstName,
        lastName,
        email,
        hashPassword
    ) {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !hashPassword
        ) {
            throw ApiError.BadRequest();
        }
        try {
            const user = (
                await userModel.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashPassword
                })
            ).save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email) {
        winston.debug("userRepository.findOneByEmail - start");
        if (!email) {
            winston.warn(
                `userRepository.findOneByEmail - null param ${JSON.stringify(email)}`
            );
            throw ApiError.BadRequest("Elektron ünvanınızı daxil edin !");
        }
        try {
            const user = await userModel.findOne({email: email});
            winston.debug("userRepository.findOneByEmail - success");
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createAddress(userID, city, zone, street, home) {
        winston.debug("userRepository.createAddress -- start");
        try {
            let type = "";
            if (!userID) {
                type = userType.PUBLIC;
            } else {
                type = userType.LOCAL;
            }
            const address = (
                await addressModel.create({
                    userId: userID,
                    userType: type,
                    city: city,
                    zone: zone,
                    street: street,
                    houseNumber: home,
                })
            ).save();
            winston.debug("userRepository.createAddress -- success");
            return address;
        } catch (error) {
            throw error;
        }
    }

    async createPhone(userID, countryCode, operatorCode, number) {
        winston.debug("userRepository.createPhone -- start");
        try {
            let type = "";
            if (!userID) {
                type = userType.PUBLIC;
            } else {
                type = userType.LOCAL;
            }
            const phone = (
                await phoneModel.create({
                    userId: userID,
                    userType: type,
                    CountryCode: countryCode,
                    OperatorCode: operatorCode,
                    Number: number,
                })
            ).save();
            winston.debug("userRepository.createPhone -- success");
            return phone;
        } catch (error) {
            throw error;
        }
    }

    async findRole(role) {
        let val = `${role}`;
        winston.debug("userRepository.findRole - start");
        if (!role) {
            winston.warn("userRepository.findRole - null param");
            throw ApiError.BadRequest();
        }
        try {
            const role = await RoleModel.findOne({ value: val });
            winston.debug("userRepository.findRole - success");
            return role;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = new userRepository();