require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const app = express()
const authnRoute = require('./routes/authn')

app.use(express.json())

    mongoose.connect(process.env.MONGO_URI)
    mongoose.connection.once('open',() => {
        console.log('Connected To MongoDB')
    })

    app.use('/BLOG/authn', authnRoute)
    app.listen(PORT,() => {
        console.log(`LIVE ON ${PORT}`)
    })