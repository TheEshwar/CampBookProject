// Packages
const path = require('path')
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

// Routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

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

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate Limiting
const limiter = rateLimit({
    windowsMS: 10*60*1000,      // 10 mins
    max: 100
})
app.use(limiter)

// Prevent HTTP params pollution
app.use(hpp())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler)

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`.yellow.bold));
