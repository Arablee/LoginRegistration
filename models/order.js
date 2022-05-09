const {model, Schema} = require("mongoose");
const userModel = require('./user');

const OrderSchema = new Schema({
    orderType:{type:String},
    user:{
        id:{type: Schema.Types.ObjectId, ref:'User'},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String,default: null},
        phones: [{type: Schema.Types.ObjectId , ref:'Phone'}],
        addresses: [{type: Schema.Types.ObjectId , ref:'Address'}],
    },
    paymentType: {type: String},
    products:[
        {
            productId:{type: Schema.Types.ObjectId , ref:'Product'},
            price:{type:Number},
            count:{type:Number},
            subtotal:{type:Number}
        }
    ],
    comment:{type:String},
    productsCount:{type:Number},
    totalPrice:{type:Number},
    orderStatusIsActive:{type:Boolean}
}, {timestamps:true,autoCreate: false,strictPopulate: false});

module.exports = model('Order', OrderSchema);
