
// const Booking = require('../models/bookingbus');

// // Controller to create a new booking
// exports.createBooking = async (req, res) => {
//   try {
//     // Extract necessary fields from the request body
//     const {
//       // userId,
//       busId,
//       busFrom,
//       busTo,
//       startTime,
//       endTime,
//       selectedSeats,
//       totalCost,
//       selectedPickupPoint,
//       selectedDropPoint,
//       travelers
//     } = req.body;

//     // Check if selectedPickupPoint and selectedDropPoint are defined before accessing their 'name' properties
//     const pickupPoint = selectedPickupPoint ? selectedPickupPoint['name'] : 'Unknown Pickup Point';
//     const dropPoint = selectedDropPoint ? selectedDropPoint['name'] : 'Unknown Drop Point';

//     // Create a new booking instance
//     const booking = new Booking({
//       // userId,
//       busId,
//       from: busFrom,
//       to: busTo,
//       startTime,
//       endTime,
//       numberOfSeats: selectedSeats,
//       totalCost,
//       pickupPoint,
//       dropPoint,
//       travelers
//     });

//     // Save the booking to the database
//     const savedBooking = await booking.save();

//     // Respond with the created booking
//     res.status(201).json({ success: true, data: savedBooking });
//   } catch (error) {
//     // Handle errors
//     console.error('Error creating booking:', error);
//     if (error.name === 'ValidationError') {
//       res.status(400).json({ success: false, error: error.message });
//     } else {
//       res.status(500).json({ success: false, error: 'Internal server error' });
//     }
//   }
// };


const Booking = require('../models/bookingbus');

// Controller to create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Extract necessary fields from the request body including userId
    const {
      userId,
      busId,
      busFrom,
      busTo,
      startTime,
      endTime,
      selectedSeats,
      totalCost,
      selectedPickupPoint,
      selectedDropPoint,
      travelers
    } = req.body;

    // Check if selectedPickupPoint and selectedDropPoint are defined before accessing their 'name' properties
    const pickupPoint = selectedPickupPoint ? selectedPickupPoint['name'] : 'Unknown Pickup Point';
    const dropPoint = selectedDropPoint ? selectedDropPoint['name'] : 'Unknown Drop Point';

    // Create a new booking instance
    const booking = new Booking({
      userId, // Including userId
      busId,
      from: busFrom,
      to: busTo,
      startTime,
      endTime,
      numberOfSeats: selectedSeats,
      totalCost,
      pickupPoint,
      dropPoint,
      travelers
    });

    // Save the booking to the database
    const savedBooking = await booking.save();

    // Respond with the created booking ID, userId, and other necessary details
    res.status(201).json({ success: true, bookingId: savedBooking._id, userId: savedBooking.userId, busId: savedBooking.busId, createdAt: savedBooking.createdAt });
  } catch (error) {
    // Handle errors
    console.error('Error creating booking:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
      const { userId } = req.body;

      // Check if userId is provided
      if (!userId) {
          return res.status(400).json({ msg: "Please provide userId" });
      }

      // Find all bookings with the given userId
      const userBookings = await Booking.find({ userId });

      // Check if any bookings are found for the user
      if (userBookings.length === 0) {
          return res.status(404).json({ msg: "No bookings found for this user" });
      }

      // Respond with the user's bookings
      res.status(200).json({ msg: "Bookings found successfully", bookings: userBookings });
  } catch (error) {
      console.error("Error finding bookings:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};

// exports.cancelBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     // Check if bookingId is provided
//     if (!bookingId) {
//       return res.status(400).json({ success: false, error: "Please provide bookingId" });
//     }

//     // Find the booking by ID and delete it from the database
//     const cancelledBooking = await Booking.findByIdAndDelete(bookingId);

//     // Check if booking exists
//     if (!cancelledBooking) {
//       return res.status(404).json({ success: false, error: "Booking not found" });
//     }

//     // Respond with a success message
//     res.status(200).json({ success: true, message: "Booking cancelled successfully", cancelledBooking });
//   } catch (error) {
//     console.error('Error cancelling booking:', error);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// };



// exports.getCancelledBookingsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Check if userId is provided
//     if (!userId) {
//       return res.status(400).json({ success: false, error: "Please provide userId" });
//     }

//     // Find all cancelled bookings with the given userId
//     const cancelledBookings = await CancelledBooking.find({ userId });

//     // Check if any cancelled bookings are found for the user
//     if (cancelledBookings.length === 0) {
//       return res.status(404).json({ success: false, error: "No cancelled bookings found for this user" });
//     }

//     // Respond with the user's cancelled bookings
//     res.status(200).json({ success: true, message: "Cancelled bookings found successfully", cancelledBookings });
//   } catch (error) {
//     console.error('Error finding cancelled bookings:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };


const CancelledBooking = require('../models/cancelbooking');

exports.getCancelledBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ success: false, error: "Please provide userId" });
    }

    // Find all cancelled bookings with the given userId
    const cancelledBookings = await CancelledBooking.find({ userId });

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

    // Find the booking by ID and delete it from the database
    const cancelledBooking = await Booking.findByIdAndDelete(bookingId);

    // Check if booking exists
    if (!cancelledBooking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    // Create a new CancelledBooking document
    const newCancelledBooking = new CancelledBooking({
      userId: cancelledBooking.userId, // Assuming userId is stored in the booking document
      cancelledAt: new Date() // Current date and time
    });

    // Save the new CancelledBooking document to the database
    await newCancelledBooking.save();

    // Respond with a success message
    res.status(200).json({ success: true, message: "Booking cancelled successfully", cancelledBooking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
