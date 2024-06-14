var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
const bloggerSchema=new mongoose.Schema(
    {
        userid:{
            type: ObjectId,
            required:true,
            ref:"regs"
        },
        bloggername: {
            type: String,
            required: true,
            maxlength: 200 
        },
        address: {
            type: String,
            required: true,
            maxlength: 200 
        },
        street: {
            type: String,
            required: true,
            maxlength: 200 
        },
        pincode: {
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
        // post:{
        //     type:String,
        //     required:true
        // },
        // postedDate:{
        //     type:Date,
        //     default:Date.now
        // }
        adminstatus:{
            type:String,
        },
        user_type: {
            type: String,
            default: "blogger",
        },
    }
)

module.exports=mongoose.model("blogger",bloggerSchema)