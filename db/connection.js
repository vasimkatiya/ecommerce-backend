const { default: mongoose } = require("mongoose");
require('dotenv').config();

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('connected successfully...');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;