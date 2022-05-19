const authRouter = require("./authRouter/authRouter")
//const userRouter = require("./userRouter/userRouter")

const applyRouters = (app) => {
    app.use("/auth", authRouter);
    //app.use("/user", userRouter);
}

module.exports = applyRouters;