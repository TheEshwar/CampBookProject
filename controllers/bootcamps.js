const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')

// @desc    Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    console.log("\nreq query :- ", req.query);
    let queryStr = JSON.stringify(req.query)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    console.log(queryStr);

    const bootcamps = await Bootcamp.find(req.query)
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })    
})

// @desc    Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp)
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        res.status(200).json({ success: true, data: bootcamp })
    
})

// @desc    Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    
})

// @desc    Update bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = asyncHandler( async (req, res, next) => {    
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!bootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))

    res.status(200).json({ success: true, data: bootcamp})
})

// @desc    Delete bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    
        if(!bootcamp)
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        
        res.status(200).json({ success: true, data: {}})
    }
    catch(err)
    {
        res.status(400).json({success: false})
    }
}