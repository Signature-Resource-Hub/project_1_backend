var express = require('express'),
routes = express.Router();
var guideController=require('../controllers/guide');

routes.post('/add',guideController.addTravelGuide);
routes.get('/view',guideController.viewAllTravelGuides);
routes.post('/getguideByLocation',guideController.getguideByLocation);



module.exports = routes;
