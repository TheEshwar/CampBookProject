// @desc    Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps", hello: req.hello })
}

// @desc    Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `GET bootcamps with id ${req.params.id}` })
}

// @desc    Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Create NEW bootcamps" })
}

// @desc    Update bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `UPDATE bootcamp with id ${req.params.id}` })
}
// @desc    Delete bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `DELETE bootcamp with id ${req.params.id}` })
}