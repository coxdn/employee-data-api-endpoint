const express = require('express')
const app = express()
const donationRoutes = require('./routes/donationRoutes')
const { handleNotFound, handleServerError } = require('../middleware/errorHandler')

app.use(express.json())
app.use('/donations', donationRoutes)

app.use(handleNotFound)
app.use(handleServerError)

module.exports = app