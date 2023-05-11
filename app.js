const express = require('express')
const app = express()
const connectDB = require('./config/db')

const userRouter = require('./routes/userRoutes.js')
// const userRouter = require('./routes/userRoutes.js')

connectDB()

app.use('/api/users', userRouter)


app.listen(3000, console.log("Server started on 3000"))