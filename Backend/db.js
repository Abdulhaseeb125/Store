require('dotenv').config()
const mongoose = require("mongoose");

let ConnectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CON_STRING, {
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000,
        });
        return true;
    } catch (err) {
        console.error('Error connecting to MongoDB database:', err);
        return false
    }
}
module.exports = ConnectMongo;



