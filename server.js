const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT || 5000

const bootcamps = require('./routes/bootcamps')
app.use('/api/v1/bootcamps', bootcamps)

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`));