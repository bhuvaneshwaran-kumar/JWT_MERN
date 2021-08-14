const mongoose = require('mongoose')

const { model, Schema } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    tokenVersion: {
        type: Number,
        default: 0
    }
})

const User = model("User", userSchema)

module.exports = User