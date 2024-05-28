var express = require('express'),
routes = express.Router();
var blogController = require('../controllers/blogs');

routes.post('/addblog',blogController.addBlog);
routes.get('/viewblog',blogController.viewAllBlogs);
routes.post('/bloglocation',blogController.getBlogsByLocation);


module.exports = routes;