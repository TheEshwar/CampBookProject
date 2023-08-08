const path = require('path')
const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({ path: './config/config.env' })
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const logger = require('./middleware/logger')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')

const fileupload = require('express-fileupload')

connectDB()

const PORT = process.env.PORT || 5000

app.use(logger)

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`.yellow.bold));
