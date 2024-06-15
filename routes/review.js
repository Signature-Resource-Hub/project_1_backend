var express = require('express'),
routes = express.Router();
var reviewController = require('../controllers/review');

routes.post('/addReviews',reviewController.addReviews);
routes.post('/getReviewsByHotel',reviewController.getReviewsByHotel);

module.exports = routes;