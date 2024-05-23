var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");
var blogSchema = new mongoose.Schema({
    userid:{
        type: ObjectId,
        required:true,
        ref:"regs"
    },
    content: {
        type: String,
        maxlength: 1000 
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    location: {
        type: String
    }

});
module.exports = mongoose.model("blogs", blogSchema);