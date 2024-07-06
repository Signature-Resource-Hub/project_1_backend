var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var bookHotelSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    hotel_id:{
        type: ObjectId,
        required:true,
        ref:"hotels"
    },
    booking_date:{
        type: Date,
        default: Date.now
    },
    book_for:{
        type: String,
        require: true
    },
    price:{
        type:String,
        required:true
    },

    username: {
        type: String,
        required: true,
        maxlength: 200 
    },
    useremail: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        
    },
    userphone: {
        type: String,
        required: true,
       
    },

    hotelname: {
        type: String,
        required: true,
        maxlength: 200 
    },

    acNonAc: {
        type: String,
        enum: ['AC', 'NON-AC'], // Specify the allowed values for AC/NON-AC
        required: true
    },

    



    
});
module.exports = mongoose.model("bookHotel", bookHotelSchema);