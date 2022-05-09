const userModel = require("../models/user");



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
}


module.exports = new userRepository();