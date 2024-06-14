var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var TravelguideSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    location:{
        type:String

    },
    star: {
        type: Number,
        required: true,
        min: 1, // Minimum rating should be 1
        max: 5 // Maximum rating should be 5
    },
    contents: {
        type: String,
        required: true,
        maxlength: 5000 // Maximum 200 characters for contents
    },
    timestamp: {
        type: Date,
        default: Date.now // Default value to current timestamp
    }
});
module.exports = mongoose.model("travelguide", TravelguideSchema);