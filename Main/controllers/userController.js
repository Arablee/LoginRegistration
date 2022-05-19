const UserService = require("../services/userService")
const TokenService = require("../services/tokenService")


class UserController{

    async registration(req, res, next){

        const {firstName, lastName, email, password, confirmPassword} = req.body;

        try {
            const user = await UserService.registration(firstName, lastName, email, password, confirmPassword);
            res.status(201).json(user);
        }catch (error) {
            next(error)
        }
    }


    async login(req, res, next){
        const {email, password} = req.body

        try{
            const user = await UserService.login(email, password);
            res.status(200).json(user)
        }catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();