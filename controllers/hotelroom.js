const HotelRoom = require('../models/hotelroom');


// Controller function to add hotel room details
exports.addRoom = (req, res) => {
    // Extract data from the request body
    const { userid, cost, numberOfPersons, description, acNonAc , availability} = req.body;

    // Check if all mandatory fields are provided
    if (!userid || !cost || !numberOfPersons || !description || !acNonAc || !availability) {
        return res.status(400).json({ msg: "Please provide all mandatory fields" });
    }

    // Create a new hotel room instance
    const newHotelRoom = new HotelRoom({
        userid,
        cost,
        numberOfPersons,
        description,
        acNonAc,
        availability
    });

    // Save the new hotel room to the database
    newHotelRoom.save()
        .then((hotelRoom) => {
            res.status(201).json({ msg: "Hotel room details added successfully", hotelRoom });
        })
        .catch((err) => {
            console.error("Error saving hotel room details:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};
