// var mongoose = require("mongoose");
const mongoose = require('mongoose');

var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Email validation using regex
                return /\S+@\S+\.\S+/.test(v);
            },
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum 6 characters for password
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Phone number validation using regex
                return /^\d{10}$/.test(v);
            },
            message: "Please enter a valid 10-digit phone number",
        },
    },
    user_type: {
        type: String,
        default: "user",
    },
    
});
module.exports = mongoose.model("regs", userSchema);
