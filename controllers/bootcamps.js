const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')

// @desc    Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
    } catch (error) {
        console.log("error all - ",error);
        res.status(400).json({ success: false })
    }
}

// @desc    Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp)
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        res.status(200).json({ success: true, data: bootcamp })
    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
}

// @desc    Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    }
    catch (err) {
        console.log("\nERROR ", err.message, "\n");
        res.status(400).json({
            success: false
        })
    }
}

// @desc    Update bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!bootcamp)
        return res.status(400).json({success: false})

    res.status(200).json({ success: true, data: bootcamp})
}

// @desc    Delete bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    
        if(!bootcamp)
            return res.status(400).json({success: false})
        
        res.status(200).json({ success: true, data: {}})
    }
    catch(err)
    {
        res.status(400).json({success: false})
    }
}