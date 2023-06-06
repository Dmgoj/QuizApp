const express = require('express')
const app = express()
const db = require('./config/db')
const session = require('express-session')
const userRouter = require('./routes/userRoutes')
const questionsRouter = require('./routes/questionsRoutes')
const auth = require('./middleware/auth')
const cors = require('cors')
//app.use(cors({
    // credentials: true,
 // }));
 var allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'sikret',
    cookie: {maxAge: 30*60*1000},
    saveUninitialized: false,
    resave: false
}))

app.use('/api/users/', userRouter)
app.use('/api/quiz/', questionsRouter)


app.listen(5000, console.log("Server started on 5000"))