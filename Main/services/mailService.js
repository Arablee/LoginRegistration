const mailConfig = require("../config/mailConfig")
const ApiError = require("../exceptions/apiError")
require("dotenv").config()


class MailService{

    constructor() {
        this.transporter = mailConfig
    }

    async sendMail(message, subject, fullName, email, phone) {

    try{
            await this.transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: process.env.EMAIL, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
        });
        }catch (e) {
            throw ApiError.GeneralException()
        }
    }

}

module.exports = new MailService();