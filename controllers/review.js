const Feedback = require('../models/feedback');

// Controller to add a new review
exports.addReviews = async (req, res) => {
  try {
    const { user_id, hotel_id, rating, review } = req.body;

    // Create a new feedback instance
    const hotelfeedback = new Feedback({
      user_id,
      hotel_id,
      rating,
      review,
    });

    // Save the feedback to the database
    await hotelfeedback.save();

    res.status(201).json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};



exports.getReviewsByHotel = async (req, res) => {
  try {
    const { hotel_id } = req.body;

    const reviews = await Feedback.find({ hotel_id });

    if (reviews.length === 0) {
      res.status(201).json({ success: true, message: 'No reviews for this hotel yet. Be the first one to add a review!' });
    } else {
      res.status(200).json({ success: true, reviews });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};





