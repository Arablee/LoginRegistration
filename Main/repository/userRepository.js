const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")


class UserRepository {

    async findByOneEmail(email){

        const user = await UserModel.findOne({email: email});
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

    async getUserById(id){
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findUserByIdAndUpdatePassword(id, hashPassword){
        try {
            return await UserModel.findByIdAndUpdate(id, {password: hashPassword})
        }catch (e){
            throw e
        }
    }
}

module.exports = new UserRepository();

