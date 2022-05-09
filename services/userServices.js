const userRepository = require("../repository/userRepository")
const winston = require("../logger/logger");
const ApiError = require("../exceptions/apiError");


class userService {

    async registration(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        city,
        zone,
        street,
        home,
        countryCode,
        operatorCode,
        number
    ) {
        winston.debug("userController.registration.UserService -- start");
        const candidate = await userRepository.findOneByEmail(email);
        if (candidate) {
            winston.warn(
                `userController.registration.UserService -- Email exists -- ${JSON.stringify(
                    candidate
                )}`
            );
            throw ApiError.ConflictException(
                `${email} elektron ünvanı artıq sistemdə mövcuddur `
            );
        }
        if (password !== confirmPassword)
            throw ApiError.BadRequest("Şifrələrdə uyğunluq yoxdur");
        const hashPassword = await bcrypt.hash(password, 3);
        const activationToken = tokenService.generateActivationToken(email);
        const timeNow = Date.now();
        const role = await userRepository.findRole(userRole.USER);
        const user = await userRepository.createUser(
            firstName,
            lastName,
            email,
            hashPassword,
            activationToken,
            role._id,
            timeNow,
            timeNow
        );
        if (!user) {
            winston.warn(
                `userController.registration.UserService -- create user -- ${JSON.stringify(
                    user
                )}`
            );
            throw ApiError.ServiceUnavailableException("Server xətası");
        }
        const address = await userRepository.createAddress(
            user._id,
            city,
            zone,
            street,
            home
        );
        if (!address) {
            winston.warn("userService.createAddress  -- address not created!");
            throw ApiError.GeneralException("Xəta baş verdi");
        }
        const phone = await userRepository.createPhone(
            user._id,
            countryCode,
            operatorCode,
            number
        );
        if (!phone) {
            winston.warn("userService.createPhone -- phone not created!");
            throw ApiError.GeneralException("Xəta baş verdi");
        }
        user.addresses.push(address);
        user.phones.push(phone);
        user.save();
        const mailSender = await mailService.sendActivationMail(
            email,
            `${process.env.api_url}/api/user/activate/${activationToken}`
        );
        const userDto = new UserDto(user); //id email isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        winston.debug("userController.registration.UserService -- success");
        return {
            user: userDto,
            message: `Təstiq mesajı ${email} ünvanına  göndərildi`,
        };
    }

}

module.exports = new userService();