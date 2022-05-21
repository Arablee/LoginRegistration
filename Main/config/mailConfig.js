const mailer = require("nodemailer")
require("dotenv").config()


module.exports = mailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWPORD,
    },
});