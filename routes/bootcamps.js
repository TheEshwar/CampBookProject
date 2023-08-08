const express = require("express")

const { getBootcamps, getBootcamp, updateBootcamp, deleteBootcamp, createBootcamp, bootcampPhotoUpload } = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advanceResults')

// Include other resource routers
const courseRouter = require('./courses')

const router = express.Router()

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/').get( advancedResults(Bootcamp, 'courses'), getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

router.route('/:id/photo').put(bootcampPhotoUpload)

module.exports = router