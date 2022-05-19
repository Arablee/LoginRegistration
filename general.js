require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const setupDbConnection = require("./Main/dbConnection/connection");
const router = require("./Main/router/router");

const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

router(app);

setupDbConnection().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});
