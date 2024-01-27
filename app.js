const express = require('express')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes)
app.use('/post',postRoutes)

module.exports = app