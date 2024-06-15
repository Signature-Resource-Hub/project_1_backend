const express = require('express');
const router = express.Router();
const guidereviewController = require('../controllers/guidereviews');

// Route to add a new review
router.post('/addguideReview', guidereviewController.addReview);
router.post('/getReviewsByguide',guidereviewController.getReviewsByguide);

module.exports = router;
