const userValidationObject = require("../userValidationObject")

module.exports = [
    userValidationObject.firstName,
    userValidationObject.lastName,
    userValidationObject.email,
    userValidationObject.password,
    userValidationObject.passwordConfirm
]