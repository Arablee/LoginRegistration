const {model, Schema} = require("mongoose");
const userModel = require("./user");

const PhoneSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, ref: "User"},
    userType:{type:String},
    CountryCode:{type:Number},
    OperatorCode: {type:Number},
    Number:{ type: Number}
}, {timestamps:true,autoCreate: false});

module.exports = model('Phone', PhoneSchema);
