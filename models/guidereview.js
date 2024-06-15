const mongoose=require("mongoose")
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
const guidefeedbackSchema= new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    guideId: {
        type: ObjectId,
        required: true,
        ref: 'guides' // Reference to the bus being booked
    },
    rating:{
        type: String,
        required:true
    },
    review:{
        type: String,
        required:true
    },
    authorName:{
        type: String,
    }
})

module.exports=mongoose.model("guidefeedback",guidefeedbackSchema)