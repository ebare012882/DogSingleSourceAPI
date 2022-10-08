///////////////////////////////////////////////////////////
// This is the entry point for the app
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// User resource (schema and model)
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Import our dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose

///////////////////////////////////////////////////////////
// Define user schema and model
///////////////////////////////////////////////////////////
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = model("User", userSchema)

///////////////////////////////////////////////////////////
// export our model
///////////////////////////////////////////////////////////
module.exports = User