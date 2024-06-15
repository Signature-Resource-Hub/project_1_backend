 const express=require("express")

 const router=express.Router()



const Blog = require("../models/blog");

// Controller function to add a new blog
exports.addBlog = async (req, res) => {
    try {
        const { userid, content , location} = req.body;

        
        const newBlog = new Blog({
            userid: userid,
            content: content,
            location: location
        });

        
        const result = await newBlog.save();

        res.json({ status: "success", message: "Blog added successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


exports.viewAllBlogs = async (req, res) => {
    try {
       
        const blogs = await Blog.find().populate('userid');

        res.json({ status: "success", data: blogs });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.getBlogsByLocation = (req, res) => {
    console.log("location is:",req.body.location);
    const { location } = req.body;

    // Check if location is provided
    if (!location) {
        return res.status(400).json({ msg: "Please provide a location" });
    }

    // Find all hotel rooms with the given location
    Blog.find({ location })
        .then((blogloc) => {
            if (!blogloc.length) {
                return res.status(404).json({ msg: "No Blogs found for the provided location" });
            }
            console.log(blogloc)
            res.status(200).json(blogloc);
        })
        .catch((err) => {
            console.error("Error Blogs:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

