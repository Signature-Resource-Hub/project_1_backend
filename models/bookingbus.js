const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'regs' // Reference to the user who made the booking
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'buses' // Reference to the bus being booked
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
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
    numberOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    pickupPoint: {
        type: String,
        required: true
    },
    dropPoint: {
        type: String,
        required: true
    },
    travelers: [{
        fullName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
