const {Schema, model} = require("mongoose")


const schema = new Schema({

            firstName: {
                type: String,
                minlength: 2,
                maxlength: 30,
                required: true
            },
            lastName: {
                type: String,
                minlength: 2,
                maxlength: 30,
                required: true
            },
            email:{
                type: String,
                unique: true,
                required: true
            },
            password:{
                type: String,
                required: true
            }
    }
)

module.exports = model("User", schema);