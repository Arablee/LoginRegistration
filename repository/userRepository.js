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

}


module.exports = new userRepository();