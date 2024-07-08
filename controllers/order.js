


const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const BookHotel = require('../models/book_hotel');
const CancelBooking = require('../models/hotel_cancel');
const ObjectId = mongoose.Types.ObjectId;

exports.bookHotel = async(req, res) => {
    // Extract data from the request body
    const { userid, hotel_id, book_for, price, username, useremail, userphone,hotelname,acNonAc} = req.body;

    // Check if all mandatory fields are provided
    if (!userid || !hotel_id || !book_for || !price || !username || !useremail || !userphone || !hotelname || !acNonAc ) {
        return res.status(400).json({ msg: "Please provide all mandatory fields" });
    }

    // Validate hotel_id format
    if (!ObjectId.isValid(hotel_id)) {
        return res.status(400).json({ msg: "Invalid hotel_id format" });
    }

    // Create a new booking instance
    const newBooking = new BookHotel({
        userid,
        hotel_id,
        book_for,
        price,
        username,
        useremail,
        userphone,
        hotelname,
        acNonAc
        
        

    });
    const savedBooking=await newBooking.save();

    // Save the new booking to the database
    newBooking.save()
        .then((savedBooking) => {
            // Construct the additional data to include in the response
            const responseData = {
                success: true,
                bookingId: savedBooking._id,
                userId: savedBooking.userid,
                hotelId: savedBooking.hotel_id,
                createdAt: savedBooking.booking_date,
                 

            };

            // Send the response with the additional data
            res.status(201).json({ msg: "Booking details added successfully", booking: responseData });
        })
        .catch((err) => {
            console.error("Error saving booking details:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};


  exports.getBookingsByUserId = (req, res) => {
    const { userid } = req.body;

    // Check if userid is provided
    if (!userid) {
        return res.status(400).json({ msg: "Please provide userid" });
    }

    // Find all hotel rooms with the given userid
    BookHotel.find({ userid })
        .then((BookHotel) => {
            if (!BookHotel.length) {
                return res.status(404).json({ msg: "No Bookings found for the provided userid" });
            }
            res.status(200).json({ msg: "Bookings found successfully", bookings :BookHotel });
        })
        .catch((err) => {
            console.error("Error finding Bookings:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};




exports.getCancelledBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ success: false, error: "Please provide userId" });
    }

    // Find all cancelled bookings with the given userId
    const cancelledBookings = await CancelBooking.find({ userId });

    // Check if any cancelled bookings are found for the user
    if (cancelledBookings.length === 0) {
      return res.status(404).json({ success: false, error: "No cancelled bookings found for this user" });
    }

    // Respond with the user's cancelled bookings
    res.status(200).json({ success: true, message: "Cancelled bookings found successfully", cancelledBookings });
  } catch (error) {
    console.error('Error finding cancelled bookings:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




exports.cancelBooking = async (req, res) => {
    try {
      const { bookingId } = req.body;
  
      // Check if bookingId is provided
      if (!bookingId) {
        return res.status(400).json({ success: false, error: "Please provide bookingId" });
      }
  
      // Find the booking by ID
      const cancelledBooking = await BookHotel.findById(bookingId);
  
      // Check if booking exists
      if (!cancelledBooking) {
        return res.status(404).json({ success: false, error: "Booking not found" });
      }
  
      // Create a new CancelledBooking document
      const newCancelledBooking = new CancelBooking({
        userId: cancelledBooking.userid, // Assuming userId is stored in the booking document
        cancelledAt: new Date() // Current date and time
      });
  
      // Save the new CancelledBooking document to the database
      await newCancelledBooking.save();

      // Delete the booking from the database
      await BookHotel.findByIdAndDelete(bookingId);
  
      // Respond with a success message
      res.status(200).json({ success: true, message: "Booking cancelled successfully", cancelledBooking });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
};