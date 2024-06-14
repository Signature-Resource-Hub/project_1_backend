var express = require('express'),
routes = express.Router();
var blogController = require('../controllers/blogs');

routes.post('/addblog',blogController.addBlog);
routes.get('/viewblog',blogController.viewAllBlogs);
routes.post('/bloglocation',blogController.getBlogsByLocation);
routes.post('/editblog',blogController.editBlog);
routes.post('/deleteBlog',blogController.deleteBlog);
routes.post('/blogsbyuserid',blogController.getBlogsByUserId);


module.exports = routes;