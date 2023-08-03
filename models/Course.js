const mongoose = require('mongoose')
const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        require: [true, 'Please add a course title']
    },
    description:{
        type: String,
        require: [true, 'Please add a course description']
    },
    weeks:{
        type: String,
        require: [true, 'Please add number of weeks']
    },
    tuition:{
        type: Number,
        require: [true, 'Please add a tuition cost']
    },
    minimumSkill:{
        type: String,
        require: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarship:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        require: Date.now
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },    
})

module.exports = mongoose.model('Course', CourseSchema);