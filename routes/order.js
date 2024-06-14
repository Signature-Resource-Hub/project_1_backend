var express = require('express'),
routes = express.Router();
var orderController = require('../controllers/order');

routes.post('/bookhotel',orderController.bookHotel);
routes.post('/order',orderController.getBookingsByUserId);
routes.post('/cancel',orderController.cancelBooking);
routes.post('/canceldetails',orderController.getCancelledBookingsByUserId)


module.exports = routes;