const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({ path: './config/config.env' })
const bootcamps = require('./routes/bootcamps')
const logger = require('./middleware/logger')

const morgan = require('morgan')

const PORT = process.env.PORT || 5000

app.use(logger)

// Dev logging middleware
if(process.env.NODE_ENV == 'development')
{
    app.use(morgan('dev'))
    
}

app.use('/api/v1/bootcamps', bootcamps)

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`));