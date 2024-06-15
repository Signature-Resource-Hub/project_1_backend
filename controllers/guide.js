const express=require("express")
// const guideModel=require("../models/guide")

const TravelGuideModel = require("../models/guide");

const router=express.Router()
exports.addTravelGuide = async (req, res) => {
    try {
        const { userid,location, star, contents } = req.body;

        // Create a new instance of the TravelGuideModel with the provided data
        const newTravelGuide = new TravelGuideModel({
            userid: userid,
            location:location,
            star: star,
            contents: contents
        });

        // Save the new travel guide to the database
        const result = await newTravelGuide.save();

        res.json({ status: "success", message: "Travel guide added successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// Controller function to view all travel guides
exports.viewAllTravelGuides = async (req, res) => {
    try {
        // Retrieve all travel guides from the database
        const travelGuides = await TravelGuideModel.find().populate('userid');

        res.json({ status: "success", data: travelGuides });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};



exports.getguideByLocation = (req, res) => {
    const { location } = req.body;

    // Check if location is provided
    if (!location) {
        return res.status(400).json({ msg: "Please provide a location" });
    }

    // Find all hotel rooms with the given location
    TravelGuideModel.find({ location })
        .then((TravelGuide) => {
            if (!TravelGuide.length) {
                return res.status(404).json({ msg: "No guides found for the provided location" });
            }
            console.log(TravelGuide)
            res.status(200).json(TravelGuide);
        })
        .catch((err) => {
            console.error("Error finding guides:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};






