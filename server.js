// Packages
const path = require('path')
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')

// Routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

// Middleware
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')

// Configuration
const connectDB = require('./config/db')
dotenv.config({ path: './config/config.env' })
connectDB()

const PORT = process.env.PORT || 5000

app.use(logger)

// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

// Cookie-Parser middleware
app.use(cookieParser())

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

app.use(errorHandler)

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`.yellow.bold));
