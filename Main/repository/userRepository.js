const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")


class UserRepository {

    async findByOneEmail(email){

        const user = await UserModel.findOne({email});

        try{
            return user;
        }catch (e) {
            throw e;
        }
    }

    async createUser(firstName, lastName, email, password){

        const user = await UserModel.create({firstName, lastName, email, password})
        return user;

    }


}

module.exports = new UserRepository();

