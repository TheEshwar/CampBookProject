const mongoose = require('mongoose')
const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name'],
        unique: false,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 chars']
    },
    slug: String,       // if name = Eshwar Deshmukh then slug = eshwardeshmukh/theEshwar
    description: {
        type: String,
        require: [true, 'Please add a description'],
        maxlength: [500, 'Name can not be more than 500 chars']
    },
    website: {
        type: String
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String
    },
    address: {
        type: String,
        require: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: Object,
        required: true
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [20, 'Rating must can not be more than 20']
    },
    averageCost:  Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Bootcamp', BootcampSchema)