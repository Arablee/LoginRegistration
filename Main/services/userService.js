const UserRepository = require("../repository/userRepository")
const bcrypt = require("bcrypt");

class UserService{

    async registration(firstName, lastName, email, password, confirmPassword){

        const candidate = await UserRepository.findByOneEmail(email);
        if(candidate)
            throw new Error("Belə istifadəçi artıq mövcuddur!!!")

        if(password !== confirmPassword)
            throw new Error("Şifrələr uyğun deyil!!!")


        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)

        return await UserRepository.createUser(firstName, lastName, email, hashPassword);
    }

    async login(email, password){
        const isExist = await UserRepository.findByOneEmail(email)
        if(!isExist)
            throw new Error("Belə istifadəçi sistemde mövcud deyil. Zehmet olmasa qeydiyyatdan kecin!!!")

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const pass = UserRepository.findByOneEmail({email})

        const passwordIsTrue = bcrypt.compare(hashPassword, pass.password)


        if (!passwordIsTrue)
            return "Shifre yanlisdir!"

        return isExist;
    }
}

module.exports = new UserService();

