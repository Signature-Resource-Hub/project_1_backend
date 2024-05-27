const Feedback = require('../models/userreview');
const mongoose = require('mongoose'); // Import mongoose library


// Controller to add a new review
exports.addReview = async (req, res) => {
  try {
    const { userid, busId, rating, review } = req.body;

    // Create a new feedback instance
    const busfeedback = new Feedback({
      userid,
      busId,
      rating,
      review,
    });

    // Save the feedback to the database
    await busfeedback.save();

    res.status(201).json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getReviewsByBus = async (req, res) => {
  try {
      const { busId } = req.body;
      
      const reviews = await Feedback.find({busId});
      console.log(reviews)
      if(reviews.length==0){
      res.status(201).json({ message:"No reviews for this bus yet. Be the first one to add a review!"});
      }
      else{
      res.status(200).json({ success: true, reviews:reviews });
      }
  } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};