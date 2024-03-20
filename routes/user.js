var express = require('express'),
routes = express.Router();
var userController = require('../controllers/user');
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
module.exports = routes;



