const express = require("express")
const dotenv = require("dotenv")

dotenv.config({path: './config/config.env'})

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`\nServer is running in '${process.env.NODE_ENV}' on PORT - ${PORT}`));