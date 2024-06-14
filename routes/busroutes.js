const express = require('express');
const router = express.Router();
const { createBooking,getBookingsByUserId, cancelBooking, getCancelledBookingsByUserId } = require('../controllers/busbook');

// Create a new booking
router.post('/createBooking', createBooking);
router.post('/getBookingsByUserId',getBookingsByUserId);
router.post('/cancelBooking',cancelBooking);
router.post('/getCancelledBookingsByUserId',getCancelledBookingsByUserId)

module.exports = router;
