const {model, Schema} = require("mongoose");
const userModel = require("./user");


const addressesSchema = new Schema({
    userId:{type: Schema.Types.ObjectId , ref:'User'},
    userType:{type:String},
    city:{type:String},
    zone:{type:String},
    street:{type:String},
    houseNumber:{type:String}
}, { timestamps : true, autoCreate : false});

module.exports = model('Address', addressesSchema);
