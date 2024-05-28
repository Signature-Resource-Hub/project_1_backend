var express = require('express'),
routes = express.Router();
var userController = require('../controllers/user');
var addbusController=require('../controllers/addbus');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/travelreg',userController.registerUser);
routes.post('/hotelreg',userController.registerUser);
routes.post('/addbus',addbusController.addbus);
routes.post('/busid',addbusController.getBusByUserId);
routes.post('/busdelete',addbusController.deleteBusByUserId);
routes.post('/busbylocation',addbusController.getBusesByLocations);
routes.post('/busbytype',addbusController.getBusesByType);
routes.post('/busacnonac',addbusController.getBusesByAcNonAc);
routes.post('/busbycost',addbusController.getBusesByCost);
routes.post('/updatebusname',addbusController.updateBusName);
routes.post('/updatelocations',addbusController.updateBusLocations);
routes.post('/updateschedule',addbusController.updateBusSchedule);
routes.post('/updatecost',addbusController.updateBusCost);
routes.post('/updateacnonac',addbusController.updateBusAcNonAc);
routes.post('/updatedescription',addbusController.updateBusDescription);
routes.post('/updatebusseats',addbusController.updateBusSeats);
routes.post('/updatebustype',addbusController.updateBusType);
routes.post('/getbusbylocationdate',addbusController.getbusbylocationdate);





module.exports = routes;



