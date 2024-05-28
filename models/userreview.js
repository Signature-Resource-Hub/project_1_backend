const mongoose=require("mongoose")
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
const feedbackSchema= new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    busId: {
        type: ObjectId,
        required: true,
        ref: 'buses' // Reference to the bus being booked
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

module.exports=mongoose.model("busfeedback",feedbackSchema)