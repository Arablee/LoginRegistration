const {Schema, model} = require("mongoose");


const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    refreshToken:{
        type: String
    }
})

module.exports = model("RefreshTokenTable", schema)