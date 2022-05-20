const {Schema, model} = require("mongoose");


const schema = new Schema({

    refreshToken:{
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = model("RefreshTokenTable", schema)