var express = require('express'),
routes = express.Router();
var userControllers = require('../controllers/user-update');
var hotelController = require('../controllers/hotelroom');
const router = express.Router();
var blogController = require('../controllers/blogs');

// const guideController = require("../controllers/blogs");

routes.post('/registers', userControllers.updateUser);
routes.post('/updateEmail',userControllers.updateEmail);
routes.post('/updatePhone',userControllers.updatePhone);
routes.post('/updatePass',userControllers.updatePassword);
routes.post('/updateForgot',userControllers.forgotPassword);
routes.post('/getUser',userControllers.getUser);
routes.post('/addroom',hotelController.addRoom);
routes.post('/hotelid',hotelController.getRoomsByUserId);
routes.post('/hoteldelete',hotelController.deleteHotelByUserId);
routes.post('/hotelacnonac',hotelController.getRoomsByAcNonAc);
routes.post('/hotellocation',hotelController.getRoomsByLocation);
routes.post('/hotelcost',hotelController.getRoomsByCost);
routes.post('/hotelnoOfPerson',hotelController.getRoomsByNumberOfPersons);
routes.post('/updatecost',hotelController.updateHotelCost);
routes.post('/updatedesc',hotelController.updateHotelDescription);
routes.post('/updateacnonac',hotelController.updateHotelAcNonAc);
routes.post('/updateperson',hotelController.updateHotelNumberOfPersons);
routes.post('/updateavailability',hotelController.updateHotelAvailability);
routes.post('/updatelocation',hotelController.updateHotelLocation);
//routes.post('/bookhotel',hotelController.bookHotel);

routes.post('/addblog',blogController.addBlog);

// Route to view all travel guides
routes.post('/viewblog',blogController.viewAllBlogs);



module.exports = routes;