const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String,
        minlength: 1,
        maxlength: 256
    },
    lastName: {type: String, minlength: 1, maxlength: 256},
    email: {type: String, unique: true, required: true},
    phones: [{type: Schema.Types.ObjectId, ref: "Phone"}],
    addresses: [{type: Schema.Types.ObjectId, ref: 'Address'}],
    avatar: {type: String, required: false},
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    password: {type: String},
    resetPasswordToken: {type: String},
    providerId: {type: Number},
    provider: {type: String},
    isActivated: {type: Boolean, default: false},
    activationToken: {type: String},
    lastLoginDate: {type: Date, default: null},
}, {timestamps: true});

module.exports = model('User', UserSchema);