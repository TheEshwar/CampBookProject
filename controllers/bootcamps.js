const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')

// @desc    Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    // Copy req.query
    const reqQuery = { ...req.query }

    // Field of exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(params => delete reqQuery[params])

    // Create query String
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    let query = Bootcamp.find(JSON.parse(queryStr))

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }
    else {
        query = query.sort('-id')
    }

    // Page and limit
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit)

    // Finding resource and Executing query
    const bootcamps = await query

    // pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps })
})

// @desc    Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    res.status(200).json({ success: true, data: bootcamp })

})

// @desc    Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success: true,
        data: bootcamp
    })

})

// @desc    Update bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!bootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    res.status(200).json({ success: true, data: bootcamp })
})

// @desc    Delete bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if (!bootcamp)
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

        res.status(200).json({ success: true, data: {} })
    }
    catch (err) {
        res.status(400).json({ success: false })
    }
}