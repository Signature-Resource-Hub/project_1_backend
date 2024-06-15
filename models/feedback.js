var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
const feedbackSchema= new mongoose.Schema({
    user_id: {
        type:ObjectId,
            required:true,
            ref:"regs"
    },
    hotel_id:{
        type:ObjectId,
            required:true,
            ref:"hotels"
    },
    rating:{
        type: String,
        required:true
    },
    review:{
        type: String,
        required:true
    }
})

module.exports=mongoose.model("hotelfeedback",feedbackSchema)