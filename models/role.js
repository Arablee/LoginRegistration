const {model, Schema} = require("mongoose");
const {userRole}=require('../enums/enums');

const RoleSchema = new Schema({
    value: {type: String, unique: true, default: userRole.USER}
}, {autoCreate: false});

RoleSchema.pre('find', function () {
    this.select('value')
});

module.exports = model('Role',RoleSchema);
