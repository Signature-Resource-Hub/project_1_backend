var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var hotelSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    hotelname: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    hotelplace: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    hoteldistrict: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    hotelpincode: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v); // Ensure the pin code consists of exactly 6 digits
            },
            message: 'Please enter a valid 6-digit pin code'
        }
    },
    hotellicense: {
        type: String,
        required: true,
        unique: true, // License number should be unique
    },
    adminstatus:{
        type:String,
    },
    user_type: {
        type: String,
        default: "hotels",
    },
});
module.exports = mongoose.model("hotels", hotelSchema);