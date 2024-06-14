var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var hotelroomSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"hotels"
    },
    hotelname: {
        type: String,
        required: true,
        maxlength: 200 
    },
    location: {
        type: String,
        required: true,
        maxlength: 200 
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
    },
    checkInTime: {
        type: String,
        required: true
    },
    checkOutTime: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5 // Rating should be between 0 and 5
    }


});
module.exports = mongoose.model("hotelrooms", hotelroomSchema);
