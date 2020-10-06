const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel