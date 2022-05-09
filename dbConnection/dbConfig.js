const mongoose = require('mongoose');
require('dotenv').config();

const setupDbConnection = async () => {
    const dbAddress = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.set('bufferCommands', false);
    const options = {
        autoCreate: false,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 100, // Maintain up to 100 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };
    const connection = mongoose.connect(dbAddress, options);
    mongoose.connection
        .once('connected', () => {
            console.log('Connected to DB...');
        })
        .on('error', (error) => {
            console.log(`Error connecting to DB: ${JSON.stringify(error.message)}`);
        })
        .on('disconnected', () => {
            console.log(`Disconnected from DB...`);
        });
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
    return connection;
};
module.exports = setupDbConnection;