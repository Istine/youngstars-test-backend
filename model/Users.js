const mongoose = require("mongoose")
const USER_SCHEMA = mongoose.Schema

const user_schema = new USER_SCHEMA({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 7
    },

    subscriptions: {
        type:Array,
        required:false,
        unique:false,
        trim:true,
    }
})

const Users = mongoose.model("Users", user_schema)
module.exports = Users