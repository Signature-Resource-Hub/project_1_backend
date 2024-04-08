// const Addbus=require('../models/booktravel')
const Bus=require('../models/booktravel')
exports.addbus = (req, res) => {
    const { userid, busName, busFrom, busTo, startTime, endTime, acNonAc, cost, description, noOfSeats, busType} = req.body;

    const newBus = new Bus({
        userid, // Assuming userid is provided in the request body
        busName,
        busFrom,
        busTo,
        startTime,
        endTime,
        acNonAc,
        cost,
        description,
        noOfSeats,
        busType
    });

    newBus.save()
        .then((bus) => {
            res.status(201).json({ msg: "Bus details added successfully", bus });
        })
        .catch((err) => {
            console.error("Error adding bus details:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
        
};
exports.getBusByUserId = (req, res) => {
    const { userid } = req.body;

    if (!userid) {
        return res.status(400).json({ msg: "Please provide userid" });
    }

    Bus.find({ userid })
        .then((buses) => {
            if (!buses.length) {
                return res.status(404).json({ msg: "No buses found for the provided userid" });
            }
            res.status(200).json({ msg: "Buses found successfully", buses });
        })
        .catch((err) => {
            console.error("Error finding buses:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};
exports.deleteBusByUserId = (req, res) => {
    const { userid } = req.body;
  
    if (!userid) {
      return res.status(400).json({ msg: "Please provide userid" });
    }
  
    Bus.findOneAndDelete({ userid })
      .then((deletedBus) => {
        if (!deletedBus) {
          return res.status(404).json({ msg: "No bus found for the provided userid" });
        }
        res.status(200).json({ msg: "Bus deleted successfully", deletedBus });
      })
      .catch((err) => {
        console.error("Error deleting bus:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      });
  };
  exports.getBusesByLocations = (req, res) => {
    const { from, to } = req.body;
  
    if (!from || !to) {
      return res.status(400).json({ msg: "Please provide both source and destination locations" });
    }
  
    Bus.find({ busFrom: from, busTo: to })
      .then((buses) => {
        if (!buses.length) {
          return res.status(404).json({ msg: "No buses found for the provided locations" });
        }
        res.status(200).json({ msg: "Buses found successfully", buses });
      })
      .catch((err) => {
        console.error("Error finding buses:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      });
  };
  exports.getBusesByType = (req, res) => {
    const { busType } = req.body;
  
    if (!busType) {
      return res.status(400).json({ msg: "Please provide busType" });
    }
  
    Bus.find({ busType })
      .then((buses) => {
        if (!buses.length) {
          return res.status(404).json({ msg: "No buses found for the provided busType" });
        }
        res.status(200).json({ msg: "Buses found successfully", buses });
      })
      .catch((err) => {
        console.error("Error finding buses:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      });
  };
  exports.getBusesByAcNonAc = (req, res) => {
    const { acNonAc } = req.body;
  
    if (!acNonAc) {
      return res.status(400).json({ msg: "Please provide AC or non-AC status" });
    }
  
    Bus.find({ acNonAc })
      .then((buses) => {
        if (!buses.length) {
          return res.status(404).json({ msg: `No buses found for ${acNonAc} status` });
        }
        res.status(200).json({ msg: "Buses found successfully", buses });
      })
      .catch((err) => {
        console.error("Error finding buses:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      });
  };
  exports.getBusesByCost = (req, res) => {
    const { cost } = req.body;
  
    if (!cost) {
      return res.status(400).json({ msg: "Please provide cost" });
    }
  
    Bus.find({ cost })
      .then((buses) => {
        if (!buses.length) {
          return res.status(404).json({ msg: "No buses found for the provided cost" });
        }
        res.status(200).json({ msg: "Buses found successfully", buses });
      })
      .catch((err) => {
        console.error("Error finding buses:", err);
        res.status(500).json({ msg: "Internal Server Error" });
      });
  };
  exports.updateBusName = (req, res) => {
    const { busId, newBusName } = req.body;

    if (!busId || !newBusName) {
        return res.status(400).json({ msg: "Please provide both busId and newBusName" });
    }

    Bus.findByIdAndUpdate(busId, { busName: newBusName }, { new: true })
        .then((updatedBus) => {
            if (!updatedBus) {
                return res.status(404).json({ msg: "No bus found for the provided busId" });
            }
            res.status(200).json({ msg: "Bus name updated successfully", updatedBus });
        })
        .catch((err) => {
            console.error("Error updating bus name:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};

  exports.updateBusLocations = (req, res) => {
    const { busId, newBusFrom, newBusTo } = req.body;

    if (!busId || (!newBusFrom && !newBusTo)) {
        return res.status(400).json({ msg: "Please provide busId and at least one of newBusFrom or newBusTo" });
    }

    const updateFields = {};
    if (newBusFrom) updateFields.busFrom = newBusFrom;
    if (newBusTo) updateFields.busTo = newBusTo;

    Bus.findByIdAndUpdate(busId, updateFields, { new: true })
        .then((updatedBus) => {
            if (!updatedBus) {
                return res.status(404).json({ msg: "No bus found for the provided busId" });
            }
            res.status(200).json({ msg: "Bus locations updated successfully", updatedBus });
        })
        .catch((err) => {
            console.error("Error updating bus locations:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};
exports.updateBusSchedule = (req, res) => {
  const { busId, newStartTime, newEndTime } = req.body;

  if (!busId || (!newStartTime && !newEndTime)) {
      return res.status(400).json({ msg: "Please provide busId and at least one of newStartTime or newEndTime" });
  }

  const updateFields = {};
  if (newStartTime) updateFields.startTime = newStartTime;
  if (newEndTime) updateFields.endTime = newEndTime;

  Bus.findByIdAndUpdate(busId, updateFields, { new: true })
      .then((updatedBus) => {
          if (!updatedBus) {
              return res.status(404).json({ msg: "No bus found for the provided busId" });
          }
          res.status(200).json({ msg: "Bus schedule updated successfully", updatedBus });
      })
      .catch((err) => {
          console.error("Error updating bus schedule:", err);
          res.status(500).json({ msg: "Internal Server Error" });
      });
};



  exports.updateBusCost = (req, res) => {
    const { busId, newCost } = req.body;

    if (!busId || !newCost) {
        return res.status(400).json({ msg: "Please provide both busId and newCost" });
    }

    Bus.findByIdAndUpdate(busId, { cost: newCost }, { new: true })
        .then((updatedBus) => {
            if (!updatedBus) {
                return res.status(404).json({ msg: "No bus found for the provided busId" });
            }
            res.status(200).json({ msg: "Bus cost updated successfully", updatedBus });
        })
        .catch((err) => {
            console.error("Error updating bus cost:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
};
exports.updateBusAcNonAc = (req, res) => {
  const { busId, newAcNonAc } = req.body;

  if (!busId || !newAcNonAc) {
      return res.status(400).json({ msg: "Please provide both busId and newAcNonAc" });
  }

  Bus.findByIdAndUpdate(busId, { acNonAc: newAcNonAc }, { new: true })
      .then((updatedBus) => {
          if (!updatedBus) {
              return res.status(404).json({ msg: "No bus found for the provided busId" });
          }
          res.status(200).json({ msg: "Bus AC/non-AC status updated successfully", updatedBus });
      })
      .catch((err) => {
          console.error("Error updating bus AC/non-AC status:", err);
          res.status(500).json({ msg: "Internal Server Error" });
      });
};
exports.updateBusDescription = (req, res) => {
  const { busId, newDescription } = req.body;

  if (!busId || !newDescription) {
      return res.status(400).json({ msg: "Please provide both busId and newDescription" });
  }

  Bus.findByIdAndUpdate(busId, { description: newDescription }, { new: true })
      .then((updatedBus) => {
          if (!updatedBus) {
              return res.status(404).json({ msg: "No bus found for the provided busId" });
          }
          res.status(200).json({ msg: "Bus description updated successfully", updatedBus });
      })
      .catch((err) => {
          console.error("Error updating bus description:", err);
          res.status(500).json({ msg: "Internal Server Error" });
      });
};
exports.updateBusSeats = (req, res) => {
  const { busId, newNoOfSeats } = req.body;

  if (!busId || !newNoOfSeats) {
      return res.status(400).json({ msg: "Please provide both busId and newNoOfSeats" });
  }

  Bus.findByIdAndUpdate(busId, { noOfSeats: newNoOfSeats }, { new: true })
      .then((updatedBus) => {
          if (!updatedBus) {
              return res.status(404).json({ msg: "No bus found for the provided busId" });
          }
          res.status(200).json({ msg: "Bus seats updated successfully", updatedBus });
      })
      .catch((err) => {
          console.error("Error updating bus seats:", err);
          res.status(500).json({ msg: "Internal Server Error" });
      });
};
exports.updateBusType = (req, res) => {
  const { busId, newBusType } = req.body;

  if (!busId || !newBusType) {
      return res.status(400).json({ msg: "Please provide both busId and newBusType" });
  }

  Bus.findByIdAndUpdate(busId, { busType: newBusType }, { new: true })
      .then((updatedBus) => {
          if (!updatedBus) {
              return res.status(404).json({ msg: "No bus found for the provided busId" });
          }
          res.status(200).json({ msg: "Bus type updated successfully", updatedBus });
      })
      .catch((err) => {
          console.error("Error updating bus type:", err);
          res.status(500).json({ msg: "Internal Server Error" });
      });
};



