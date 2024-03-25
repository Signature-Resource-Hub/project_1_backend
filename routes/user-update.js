var express = require('express'),
routes = express.Router();
var userController = require('../controllers/user-update');
routes.post('/register', userController.updateUser);
routes.post('/updateEmail',userController.updateEmail);
routes.post('/updatePhone',userController.updatePhone);
routes.post('/updatePass',userController.updatePassword);
routes.post('/updateForgot',userController.forgotPassword);
module.exports = routes;