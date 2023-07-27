const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const Bootcamp = require('./models/Bootcamp')
const { log } = require('console')

mongoose.connect(process.env.MONGO_URI, {
});

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('Data imported...'.green.inverse);
        process.exit()
    }
    catch (err) {
        console.error(err)
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data destroyed...'.red.inverse);
        process.exit()
    }
    catch (err) {
        console.error(err)
    }
}


if (process.argv[2] === '-i') {
    importData()
}
if (process.argv[2] === '-d') {
    deleteData()
}