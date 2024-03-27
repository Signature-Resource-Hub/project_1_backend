var express = require('express'),
routes = express.Router();
var userControllers = require('../controllers/user-update');
var hotelController = require('../controllers/hotelroom');
routes.post('/register', userControllers.updateUser);
routes.post('/updateEmail',userControllers.updateEmail);
routes.post('/updatePhone',userControllers.updatePhone);
routes.post('/updatePass',userControllers.updatePassword);
routes.post('/updateForgot',userControllers.forgotPassword);
routes.post('/getUser',userControllers.getUser);
routes.post('/addroom',hotelController.addRoom);

module.exports = routes;