var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var guideSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    guidename: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    address: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    street: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    guidepincode: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v); // Ensure the pin code consists of exactly 6 digits
            },
            message: 'Please enter a valid 6-digit pin code'
        }
    },
    image: {
        type: String 
    },
    adminstatus:{
        type:String,
    },
    user_type: {
        type: String,
        default: "guide",
    },
});
module.exports = mongoose.model("guide", guideSchema);