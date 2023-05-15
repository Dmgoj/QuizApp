const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const url = process.env.DB_URL;
mongoose.set('strictQuery', true);
const connectDB = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection

module.exports = db