const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const asyncHandler = require('../middleware/async')

// @desc    Get all users
// @routes  GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// @desc    Get Single users
// @routes  GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Create User
// @routes  POST /api/v1/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(201).json({
        success: true,
        data: user
    })
})

// @desc    Update User
// @routes  PUT /api/v1/auth/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    console.log('\n update user :- ', user);
    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Delete User
// @routes  DELETE /api/v1/auth/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data: {}
    })
})
