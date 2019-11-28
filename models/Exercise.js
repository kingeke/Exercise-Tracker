var model = require('mongoose').model
var Schema = require('mongoose').Schema

const exerciseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date()
    }
})

const Exercise = model('Exercise', exerciseSchema)

module.exports = Exercise