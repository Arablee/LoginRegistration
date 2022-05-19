const { body } = require("express-validator")

const firstName = body("firstName")
    .trim()
    .escape()
    .isString()
    .withMessage("Adinizi duzgun formatda daxil edin!!!")
    .notEmpty()
    .withMessage("Xana mutleq doldurulmalidir")

const lastName = body("lastName")
    .trim()
    .escape()
    .isString()
    .withMessage("Soyadinizi duzgun formatda daxil edin!!!")
    .notEmpty()
    .withMessage("Xana mutleq doldurulmalidir")

const email = body("email")
    .trim()
    .escape()
    .isString()
    .withMessage("emailinizi duzgun formatda daxil edin!!!")
    .notEmpty()
    .withMessage("Xana mutleq doldurulmalidir")
    .isEmail()
    .withMessage("Emailinizi duzgun formatda daxil edin")

const password = body("password")
    .trim()
    .escape()
    .isString()
    .withMessage("Shifeni duzgun formatda daxil edin")
    .notEmpty()
    .withMessage("Xana mutleq doldurulmalidir")

const passwordConfirm = body("confirmPassword")
    .trim()
    .escape()
    .isString()
    .withMessage("Shifeni duzgun formatda daxil edin")
    .notEmpty()
    .withMessage("Xana mutleq doldurulmalidir")
    .custom((value, { req }) => {
            if (value !== req.body.password){
            throw new Error("Shifreler uygun deyil")
        }
        return true
    })


module.exports = {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm
}