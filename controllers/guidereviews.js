const Feedback = require('../models/guidereview');
const mongoose = require('mongoose'); // Import mongoose library


// Controller to add a new review
exports.addReview = async (req, res) => {
  try {
    const { userid, guideId, rating, review } = req.body;

    // Create a new feedback instance
    const guidefeedback = new Feedback({
      userid,
      guideId,
      rating,
      review,
    });

    // Save the feedback to the database
    await guidefeedback.save();

    res.status(201).json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getReviewsByguide = async (req, res) => {
  try {
      const { guideId } = req.body;
      
      const reviews = await Feedback.find({guideId});
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