const UserRepository = require("../repository/userRepository")
const bcrypt = require("bcrypt");
const tokenService = require("../services/tokenService")

class UserService{

    async registration(firstName, lastName, email, password, confirmPassword){

        const candidate = await UserRepository.findByOneEmail(email);
        if(candidate)
            throw new Error("Belə istifadəçi artıq mövcuddur!!!")

        if(password !== confirmPassword)
            throw new Error("Şifrələr uyğun deyil!!!")


        const saltRounds = 3;
        const hashPassword = await bcrypt.hash(password, saltRounds)

        return await UserRepository.createUser(firstName, lastName, email, hashPassword);
    }

    async login(email, password){
        const isExist = await UserRepository.findByOneEmail(email)
        if(!isExist)
            throw new Error("Belə istifadəçi sistemde mövcud deyil. Zehmet olmasa qeydiyyatdan kecin!!!")
        const passwordIsTrue = await bcrypt.compare(password, isExist.password)
        if (!passwordIsTrue){
            return "Shifre yanlisdir!"}
        return isExist;
    }

    async refresh(refreshToken) {

        const userData = await tokenService.validateRefreshToken(refreshToken);

        if (!userData) {
            throw "xeta"
        }
        const user = await UserRepository.getUserById(userData.id);
        if (!user) {

            throw "xeta"
        }

        const tokens = tokenService.generateTokens(user.email);
        if (!tokens) {
            throw "xeta"
        }
        // await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user};
    }

    async logout(refreshToken) {
        try {
            const user = await tokenService.validateRefreshToken(refreshToken);
            if (!user) {
                return "User not found!";
            }
            await tokenService.removeRefreshToken(user.userID);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();

