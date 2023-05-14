const express = require('express')
const app = express()
const db = require('./config/db')
const session = require('express-session')
const userRouter = require('./routes/userRoutes')
const questionsRouter = require('./routes/questionsRoutes')
const auth = require('./middleware/auth')

// const userRouter = require('./routes/userRoutes.js')
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


app.listen(3000, console.log("Server started on 3000"))