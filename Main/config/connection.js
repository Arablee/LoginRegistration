require("dotenv").config();
const mongoose = require("mongoose");

const setupDbConnection = () => {
    const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    const options = {
        autoCreate: false,
        autoIndex: false,
    };

    mongoose.set("bufferCommands", false);

    const connection = mongoose.connect(dbURI, options);

    mongoose.connection
        .once("connected", () => {
            console.log("DB is connected...");
        })
        .on("error", (error) => {
            console.log(`Error connecting to DB: ${JSON.stringify(error.message)}`);
        })
        .on("disconnected", () => {
            console.log("Disconnected from DB...");
        });

    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        process.exit(0);
    });

    return connection;
};

module.exports = setupDbConnection;
