const HotelRoom = require('../models/hotelroom');


// Controller function to add hotel room details
exports.addRoom = (req, res) => {
    // Extract data from the request body
    const { userid,location,cost, numberOfPersons, description, acNonAc , availability,hotelname} = req.body;

    // Check if all mandatory fields are provided
    if (!userid || !cost || !numberOfPersons || !description || !acNonAc || !availability || !location || !hotelname) {
        return res.status(400).json({ msg: "Please provide all mandatory fields" });
    }

    // Create a new hotel room instance
    const newHotelRoom = new HotelRoom({
        userid,
        hotelname,
        location,
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



// Controller function to retrieve hotel room details by userid
exports.getRoomsByUserId = (req, res) => {
    const { userid } = req.body;

    // Check if userid is provided
    if (!userid) {
        return res.status(400).json({ msg: "Please provide userid" });
    }

    // Find all hotel rooms with the given userid
    HotelRoom.find({ userid })
        .then((hotelRooms) => {
            if (!hotelRooms.length) {
                return res.status(404).json({ msg: "No hotel rooms found for the provided userid" });
            }
            res.status(200).json({ msg: "Hotel rooms found successfully", hotelRooms });
        })
        .catch((err) => {
            console.error("Error finding hotel rooms:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.deleteHotelByUserId = (req, res) => {
    const { userid } = req.body;

    // Check if userid is provided
    if (!userid) {
        return res.status(400).json({ msg: "Please provide userid" });
    }

    // Find and delete the hotel rooms associated with the given userid
    HotelRoom.findOneAndDelete({ userid })
        .then((deletedHotelRoom) => {
            if (!deletedHotelRoom) {
                return res.status(404).json({ msg: "No hotel rooms found for the provided userid" });
            }
            res.status(200).json({ msg: "Hotel room deleted successfully", deletedHotelRoom });
        })
        .catch((err) => {
            console.error("Error deleting hotel room:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.getRoomsByAcNonAc = (req, res) => {
    const { acNonAc } = req.body;

    // Check if acNonAc is provided
    if (!acNonAc) {
        return res.status(400).json({ msg: "Please provide AC or non-AC status" });
    }

    // Find hotel rooms with the given AC or non-AC status
    HotelRoom.find({ acNonAc })
        .then((hotelRooms) => {
            if (!hotelRooms.length) {
                return res.status(404).json({ msg: `No hotel rooms found for ${acNonAc} status` });
            }
            res.status(200).json({ msg: "Hotel rooms found successfully", hotelRooms });
        })
        .catch((err) => {
            console.error("Error finding hotel rooms:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.getRoomsByCost = (req, res) => {
    const { cost } = req.body;

    // Check if cost is provided
    if (!cost) {
        return res.status(400).json({ msg: "Please provide cost" });
    }

    // Find hotel rooms with the given cost
    HotelRoom.find({ cost })
        .then((hotelRooms) => {
            if (!hotelRooms.length) {
                return res.status(404).json({ msg: "No hotel rooms found for the provided cost" });
            }
            res.status(200).json({ msg: "Hotel rooms found successfully", hotelRooms });
        })
        .catch((err) => {
            console.error("Error finding hotel rooms:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.getRoomsByNumberOfPersons = (req, res) => {
    const { numberOfPersons } = req.body;

    // Check if numberOfPersons is provided
    if (!numberOfPersons) {
        return res.status(400).json({ msg: "Please provide number of persons" });
    }

    // Find hotel rooms with the given number of persons
    HotelRoom.find({ numberOfPersons })
        .then((hotelRooms) => {
            if (!hotelRooms.length) {
                return res.status(404).json({ msg: "No hotel rooms found for the provided number of persons" });
            }
            res.status(200).json({ msg: "Hotel rooms found successfully", hotelRooms });
        })
        .catch((err) => {
            console.error("Error finding hotel rooms:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.updateHotelCost = (req, res) => {
    const { hotelId, newCost } = req.body;

    if (!hotelId || !newCost) {
        return res.status(400).json({ msg: "Please provide both hotelId and newCost" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { cost: newCost }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel cost updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel cost:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.updateHotelDescription = (req, res) => {
    const { hotelId, newDescription } = req.body;

    if (!hotelId || !newDescription) {
        return res.status(400).json({ msg: "Please provide both hotelId and newDescription" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { description: newDescription }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel description updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel description:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};


exports.updateHotelAcNonAc = (req, res) => {
    const { hotelId, newAcNonAc } = req.body;

    if (!hotelId || !newAcNonAc) {
        return res.status(400).json({ msg: "Please provide both hotelId and newAcNonAc" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { acNonAc: newAcNonAc }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel AC/non-AC status updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel AC/non-AC status:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.updateHotelNumberOfPersons = (req, res) => {
    const { hotelId, newNumberOfPersons } = req.body;

    if (!hotelId || !newNumberOfPersons) {
        return res.status(400).json({ msg: "Please provide both hotelId and newNumberOfPersons" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { numberOfPersons: newNumberOfPersons }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel number of persons capacity updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel number of persons capacity:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.updateHotelAvailability = (req, res) => {
    const { hotelId, newAvailability } = req.body;

    if (!hotelId || !newAvailability) {
        return res.status(400).json({ msg: "Please provide both hotelId and newAvailability" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { availability: newAvailability }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel availability updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel availability:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

exports.updateHotelLocation = (req, res) => {
    const { hotelId, newLocation } = req.body;

    if (!hotelId || !newLocation) {
        return res.status(400).json({ msg: "Please provide both hotelId and newLocation" });
    }

    HotelRoom.findByIdAndUpdate(hotelId, { location: newLocation }, { new: true })
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return res.status(404).json({ msg: "No hotel found for the provided hotelId" });
            }
            res.status(200).json({ msg: "Hotel location updated successfully", updatedHotel });
        })
        .catch((err) => {
            console.error("Error updating hotel location:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};


