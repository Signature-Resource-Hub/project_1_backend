const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/userreview');

// Route to add a new review
router.post('/addReview', reviewController.addReview);
router.post('/getReviewsByBus',reviewController.getReviewsByBus);

module.exports = router;
