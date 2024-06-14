// var mongoose = require("mongoose");
// var bcrypt = require("bcrypt");
// const {ObjectId}=require("mongodb");
// var BusSchema = new mongoose.Schema({
    
//     userid:{
//         type: ObjectId,
//         required:true,
//         ref:"travels"
//     },
//     id:{
//         type: String
//    },
//     busName: {
//         type: String,
//         required: true,
//         maxlength: 50 // Maximum 50 characters for bus name
//     },
//     busFrom: {
//         type: String,
//         required: true,
//         maxlength: 50 // Maximum 50 characters for source location
//     },
//     busTo: {
//         type: String,
//         required: true,
//         maxlength: 50 // Maximum 50 characters for destination location
//     },
//     startTime: {
//         type: String,
//         required: true,
//         validate: {
//             validator: function(v) {
//                 // Regular expression to validate time in HH:MM format
//                 return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
//             },
//             message: 'Please enter a valid time in HH:MM format'
//         }
//     },
//     endTime: {
//         type: String,
//         required: true,
//         validate: {
//             validator: function(v) {
//                 // Regular expression to validate time in HH:MM format
//                 return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
//             },
//             message: 'Please enter a valid time in HH:MM format'
//         }
//     },
//     acNonAc: {
//         type: String,
//         // enum: ['AC', 'NON-AC'], // Specify the allowed values for AC/NON-AC
//         required: true
//     },
//     cost: {
//         type: Number,
//         required: true,
//         min: 0 // Minimum cost should be 0 or positive
//     },
//     description: {
//         type: String
//     },
//     noOfSeats: {
//         type: Number
//     },
//     busType: {
//         type: String
//     },
//     adminstatus: {
//         type: String
//     },
// });

// module.exports = mongoose.model("bus", BusSchema);   


var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const {ObjectId}=require("mongodb");

//const arrayNotEmpty = arr => arr && arr.length > 0;
var BusSchema = new mongoose.Schema({
    
    userid:{
        type: ObjectId,
        required:true,
        ref:"travels"
    },
    id:{
        type: String
   },
    busName: {
        type: String,
        required: true,
        maxlength: 50 // Maximum 50 characters for bus name
    },
    busFrom: {
        type: String,
        required: true,
        maxlength: 50 // Maximum 50 characters for source location
    },
    busTo: {
        type: String,
        required: true,
        maxlength: 50 // Maximum 50 characters for destination location
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regular expression to validate time in HH:MM format
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: 'Please enter a valid time in HH:MM format'
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Regular expression to validate time in HH:MM format
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: 'Please enter a valid time in HH:MM format'
        }
    },
    acNonAc: {
        type: String,
        // enum: ['AC', 'NON-AC'], // Specify the allowed values for AC/NON-AC
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0 // Minimum cost should be 0 or positive
    },
    description: {
        type: String
    },
    noOfSeats: {
        type: Number
    },
    busType: {
        type: String
    },
    adminstatus: {
        type: String
    },

    availableDate: {
        type: [Date], // Array of dates representing available dates
        required: true
    },
    pickupPoints: [{
        name: { type: String, required: true },
        time: { type: String, required: true } // Time for each pickup point
    }],
    dropPoints: [{
        name: { type: String, required: true },
        time: { type: String, required: true } // Time for each drop point
    }]
});

module.exports = mongoose.model("bus", BusSchema);   
