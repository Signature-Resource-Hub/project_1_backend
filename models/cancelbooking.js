// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for CancelledBooking
const cancelledBookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  
  cancelledAt: {
    type: Date,
    default: Date.now
  }
});

// Create the CancelledBooking model
const CancelledBooking = mongoose.model('CancelledBooking', cancelledBookingSchema);

// Export the model
module.exports = CancelledBooking;
