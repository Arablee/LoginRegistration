const UserRepository = require("../repository/userRepository")
const bcrypt = require("bcrypt");
const tokenService = require("../services/tokenService")
const ApiError = require("../exceptions/apiError")

class UserService{

    async registration(firstName, lastName, email, password, confirmPassword){

        const candidate = await UserRepository.findByOneEmail(email);
        if(candidate)
            throw ApiError.BadRequest("Belə istifadəçi artıq mövcuddur!!!")

        if(password !== confirmPassword)
            throw ApiError.BadRequest("Shifreler uygun deyil")


        const saltRounds = 3;
        const hashPassword = await bcrypt.hash(password, saltRounds)

        return await UserRepository.createUser(firstName, lastName, email, hashPassword);
    }

    async login(email, password){
        const isExist = await UserRepository.findByOneEmail(email)
        if(!isExist)
            throw ApiError.NotFoundException()
        const passwordIsTrue = await bcrypt.compare(password, isExist.password)
        if (!passwordIsTrue){
            throw ApiError.BadRequest("Shifre yanlishdir")}
        return isExist;
    }

    async refresh(refreshToken) {

        const userData = await tokenService.validateRefreshToken(refreshToken);

        if (!userData) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserRepository.getUserById(userData.id);
        if (!user) {

            throw ApiError.UnauthorizedError();
        }

        const tokens = tokenService.generateTokens(user.email);
        if (!tokens) {
            throw ApiError.UnauthorizedError();
        }
        // await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user};
    }

    async logout(refreshToken) {
        try {
            const user = await tokenService.validateRefreshToken(refreshToken);
            if (!user) {
                throw ApiError.NotFoundException("Istifadechi tapilmadi");
            }
            await tokenService.removeRefreshToken(user.userID);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();

