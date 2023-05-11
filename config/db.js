const mongoose = require('mongoose');
const url = 'mongodb+srv://domagojgrgic:domagoj123@domagojcluster.ddzydz0.mongodb.net/QuizApp?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });