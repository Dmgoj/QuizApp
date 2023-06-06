const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/QuizApp";
mongoose.set('strictQuery', true);
const connectDB = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection

module.exports = db