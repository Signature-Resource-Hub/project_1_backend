var mongoose=require("mongoose");
const {ObjectId}=require("mongodb");
var  bcrypt = require("bcrypt");
var travelSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    travelsname: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    travelsplace: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    travelsdistrict: {
        type: String,
        required: true,
        maxlength: 20, // Maximum 20 characters for username
    },
    travelspincode: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v); // Ensure the pin code consists of exactly 6 digits
            },
            message: 'Please enter a valid 6-digit pin code'
        }
    },
    travelslicense: {
        type: String,
        required: true,
        unique: true, // License number should be unique
    },
    adminstatus:{
        type:String,
    },

    user_type: {
        type: String,
        default: "travells",
    },
});
module.exports = mongoose.model("travels", travelSchema);
