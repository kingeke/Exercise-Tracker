var model = require('mongoose').model
var Schema = require('mongoose').Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,

    }
})

const User = model('User', userSchema)

module.exports = User