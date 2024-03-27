var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var hotelroomSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"hotels"
    },
    cost: {
        type: Number,
        required: true,
        min: 0 // Minimum cost should be 0 or positive
    },
    numberOfPersons: {
        type: Number,
        required: true,
        min: 1 // Minimum number of persons should be 1
    },
    description: {
        type: String,
        required: true,
        maxlength: 200 // Maximum 200 characters for description
    },
    acNonAc: {
        type: String,
        enum: ['AC', 'NON-AC'], // Specify the allowed values for AC/NON-AC
        required: true
    },
    availability: {
        type: String,
        enum: ['YES', 'NO'], // Specify the allowed values for availability
        required: true
    }


});
module.exports = mongoose.model("hotelrooms", hotelroomSchema);