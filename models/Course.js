const mongoose = require('mongoose')
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: [true, 'Please add a course title']
    },
    description: {
        type: String,
        require: [true, 'Please add a course description']
    },
    weeks: {
        type: String,
        require: [true, 'Please add number of weeks']
    },
    tuition: {
        type: Number,
        require: [true, 'Please add a tuition cost']
    },
    minimumSkill: {
        type: String,
        require: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarship: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        require: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
})

// Static method to get average course cost
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    console.log('Calculating course average cost'.blue);

    const obj = await this.aggregate([
        {
            $match: {bootcamp: bootcampId}
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: {$avg: '$tuition'}
            }
        }
    ])

    console.log("\n",obj, "\n");
}

// Call getAverageCost after save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp)
})

// Call getAverageCost before save
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema);