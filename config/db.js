const mongoose = require('mongoose');
const url = 'mongodb+srv://domagojgrgic:domagoj123@domagojcluster.ddzydz0.mongodb.net/QuizApp?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
const connectDB = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection

module.exports = db