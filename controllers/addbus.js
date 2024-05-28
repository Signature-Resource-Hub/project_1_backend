// // const Addbus=require('../models/booktravel')
// const Bus=require('../models/booktravel')
// exports.addbus = (req, res) => {
//     const { userid, busName, busFrom, busTo, startTime, endTime, acNonAc, cost, description, noOfSeats, busType} = req.body;

//     const newBus = new Bus({
//         userid, // Assuming userid is provided in the request body
//         busName,
//         busFrom,
//         busTo,
//         startTime,
//         endTime,
//         acNonAc,
//         cost,
//         description,
//         noOfSeats,
//         busType
//     });

//     newBus.save()
//         .then((bus) => {
//             res.status(201).json({ msg: "Bus details added successfully", bus });
//         })
//         .catch((err) => {
//             console.error("Error adding bus details:", err);
//             res.status(500).json({ msg: "Internal Server Error" });
//         });
        
// };
// exports.getBusByUserId = (req, res) => {
//     const { userid } = req.body;

//     if (!userid) {
//         return res.status(400).json({ msg: "Please provide userid" });
//     }

//     Bus.find({ userid })
//         .then((buses) => {
//             if (!buses.length) {
//                 return res.status(404).json({ msg: "No buses found for the provided userid" });
//             }
//             res.status(200).json({ msg: "Buses found successfully", buses });
//         })
//         .catch((err) => {
//             console.error("Error finding buses:", err);
//             res.status(500).json({ msg: "Internal Server Error" });
//         });
// };
// exports.deleteBusByUserId = (req, res) => {
//     const { userid } = req.body;
  
//     if (!userid) {
//       return res.status(400).json({ msg: "Please provide userid" });
//     }
  
//     Bus.findOneAndDelete({ userid })
//       .then((deletedBus) => {
//         if (!deletedBus) {
//           return res.status(404).json({ msg: "No bus found for the provided userid" });
//         }
//         res.status(200).json({ msg: "Bus deleted successfully", deletedBus });
//       })
//       .catch((err) => {
//         console.error("Error deleting bus:", err);
//         res.status(500).json({ msg: "Internal Server Error" });
//       });
//   };
//   exports.getBusesByLocations = (req, res) => {
//     console.log(req.body)
//     const { from, to } = req.body;
  
//     if (!from || !to) {
//       return res.status(400).json({ msg: "Please provide both source and destination locations" });
//     }
  
//     Bus.find({ busFrom: from, busTo: to })
//       .then((buses) => {
//         if (!buses.length) {
//           return res.status(404).json({ msg: "No buses found for the provided locations" });
//         }
//         console.log(buses)
//         res.status(200).json(buses);
//       })
//       .catch((err) => {
//         console.error("Error finding buses:", err);
//         res.status(500).json({ msg: "Internal Server Error" });
//       });
//   };
//   exports.getBusesByType = (req, res) => {
//     const { busType } = req.body;
  
//     if (!busType) {
//       return res.status(400).json({ msg: "Please provide busType" });
//     }
  
//     Bus.find({ busType })
//       .then((buses) => {
//         if (!buses.length) {
//           return res.status(404).json({ msg: "No buses found for the provided busType" });
//         }
//         res.status(200).json({ msg: "Buses found successfully", buses });
//       })
//       .catch((err) => {
//         console.error("Error finding buses:", err);
//         res.status(500).json({ msg: "Internal Server Error" });
//       });
//   };
//   exports.getBusesByAcNonAc = (req, res) => {
//     const { acNonAc } = req.body;
  
//     if (!acNonAc) {
//       return res.status(400).json({ msg: "Please provide AC or non-AC status" });
//     }
  
//     Bus.find({ acNonAc })
//       .then((buses) => {
//         if (!buses.length) {
//           return res.status(404).json({ msg: `No buses found for ${acNonAc} status` });
//         }
//         res.status(200).json({ msg: "Buses found successfully", buses });
//       })
//       .catch((err) => {
//         console.error("Error finding buses:", err);
//         res.status(500).json({ msg: "Internal Server Error" });
//       });
//   };
//   exports.getBusesByCost = (req, res) => {
//     const { cost } = req.body;
  
//     if (!cost) {
//       return res.status(400).json({ msg: "Please provide cost" });
//     }
  
//     Bus.find({ cost })
//       .then((buses) => {
//         if (!buses.length) {
//           return res.status(404).json({ msg: "No buses found for the provided cost" });
//         }
//         res.status(200).json({ msg: "Buses found successfully", buses });
//       })
//       .catch((err) => {
//         console.error("Error finding buses:", err);
//         res.status(500).json({ msg: "Internal Server Error" });
//       });
//   };
//   exports.updateBusName = (req, res) => {
//     const { busId, newBusName } = req.body;

//     if (!busId || !newBusName) {
//         return res.status(400).json({ msg: "Please provide both busId and newBusName" });
//     }

//     Bus.findByIdAndUpdate(busId, { busName: newBusName }, { new: true })
//         .then((updatedBus) => {
//             if (!updatedBus) {
//                 return res.status(404).json({ msg: "No bus found for the provided busId" });
//             }
//             res.status(200).json({ msg: "Bus name updated successfully", updatedBus });
//         })
//         .catch((err) => {
//             console.error("Error updating bus name:", err);
//             res.status(500).json({ msg: "Internal Server Error" });
//         });
// };

//   exports.updateBusLocations = (req, res) => {
//     const { busId, newBusFrom, newBusTo } = req.body;

//     if (!busId || (!newBusFrom && !newBusTo)) {
//         return res.status(400).json({ msg: "Please provide busId and at least one of newBusFrom or newBusTo" });
//     }

//     const updateFields = {};
//     if (newBusFrom) updateFields.busFrom = newBusFrom;
//     if (newBusTo) updateFields.busTo = newBusTo;

//     Bus.findByIdAndUpdate(busId, updateFields, { new: true })
//         .then((updatedBus) => {
//             if (!updatedBus) {
//                 return res.status(404).json({ msg: "No bus found for the provided busId" });
//             }
//             res.status(200).json({ msg: "Bus locations updated successfully", updatedBus });
//         })
//         .catch((err) => {
//             console.error("Error updating bus locations:", err);
//             res.status(500).json({ msg: "Internal Server Error" });
//         });
// };
// exports.updateBusSchedule = (req, res) => {
//   const { busId, newStartTime, newEndTime } = req.body;

//   if (!busId || (!newStartTime && !newEndTime)) {
//       return res.status(400).json({ msg: "Please provide busId and at least one of newStartTime or newEndTime" });
//   }

//   const updateFields = {};
//   if (newStartTime) updateFields.startTime = newStartTime;
//   if (newEndTime) updateFields.endTime = newEndTime;

//   Bus.findByIdAndUpdate(busId, updateFields, { new: true })
//       .then((updatedBus) => {
//           if (!updatedBus) {
//               return res.status(404).json({ msg: "No bus found for the provided busId" });
//           }
//           res.status(200).json({ msg: "Bus schedule updated successfully", updatedBus });
//       })
//       .catch((err) => {
//           console.error("Error updating bus schedule:", err);
//           res.status(500).json({ msg: "Internal Server Error" });
//       });
// };



//   exports.updateBusCost = (req, res) => {
//     const { busId, newCost } = req.body;

//     if (!busId || !newCost) {
//         return res.status(400).json({ msg: "Please provide both busId and newCost" });
//     }

//     Bus.findByIdAndUpdate(busId, { cost: newCost }, { new: true })
//         .then((updatedBus) => {
//             if (!updatedBus) {
//                 return res.status(404).json({ msg: "No bus found for the provided busId" });
//             }
//             res.status(200).json({ msg: "Bus cost updated successfully", updatedBus });
//         })
//         .catch((err) => {
//             console.error("Error updating bus cost:", err);
//             res.status(500).json({ msg: "Internal Server Error" });
//         });
// };
// exports.updateBusAcNonAc = (req, res) => {
//   const { busId, newAcNonAc } = req.body;

//   if (!busId || !newAcNonAc) {
//       return res.status(400).json({ msg: "Please provide both busId and newAcNonAc" });
//   }

//   Bus.findByIdAndUpdate(busId, { acNonAc: newAcNonAc }, { new: true })
//       .then((updatedBus) => {
//           if (!updatedBus) {
//               return res.status(404).json({ msg: "No bus found for the provided busId" });
//           }
//           res.status(200).json({ msg: "Bus AC/non-AC status updated successfully", updatedBus });
//       })
//       .catch((err) => {
//           console.error("Error updating bus AC/non-AC status:", err);
//           res.status(500).json({ msg: "Internal Server Error" });
//       });
// };
// exports.updateBusDescription = (req, res) => {
//   const { busId, newDescription } = req.body;

//   if (!busId || !newDescription) {
//       return res.status(400).json({ msg: "Please provide both busId and newDescription" });
//   }

//   Bus.findByIdAndUpdate(busId, { description: newDescription }, { new: true })
//       .then((updatedBus) => {
//           if (!updatedBus) {
//               return res.status(404).json({ msg: "No bus found for the provided busId" });
//           }
//           res.status(200).json({ msg: "Bus description updated successfully", updatedBus });
//       })
//       .catch((err) => {
//           console.error("Error updating bus description:", err);
//           res.status(500).json({ msg: "Internal Server Error" });
//       });
// };
// exports.updateBusSeats = (req, res) => {
//   const { busId, newNoOfSeats } = req.body;

//   if (!busId || !newNoOfSeats) {
//       return res.status(400).json({ msg: "Please provide both busId and newNoOfSeats" });
//   }

//   Bus.findByIdAndUpdate(busId, { noOfSeats: newNoOfSeats }, { new: true })
//       .then((updatedBus) => {
//           if (!updatedBus) {
//               return res.status(404).json({ msg: "No bus found for the provided busId" });
//           }
//           res.status(200).json({ msg: "Bus seats updated successfully", updatedBus });
//       })
//       .catch((err) => {
//           console.error("Error updating bus seats:", err);
//           res.status(500).json({ msg: "Internal Server Error" });
//       });
// };
// exports.updateBusType = (req, res) => {
//   const { busId, newBusType } = req.body;

//   if (!busId || !newBusType) {
//       return res.status(400).json({ msg: "Please provide both busId and newBusType" });
//   }

//   Bus.findByIdAndUpdate(busId, { busType: newBusType }, { new: true })
//       .then((updatedBus) => {
//           if (!updatedBus) {
//               return res.status(404).json({ msg: "No bus found for the provided busId" });
//           }
//           res.status(200).json({ msg: "Bus type updated successfully", updatedBus });
//       })
//       .catch((err) => {
//           console.error("Error updating bus type:", err);
//           res.status(500).json({ msg: "Internal Server Error" });
//       });
// };



// const Addbus=require('../models/booktravel')
const moment=require('moment');
const Bus = require('../models/booktravel');

exports.addbus = async (req, res) => {
  try {
      const {
          userid,
          id,
          busName,
          busFrom,
          busTo,
          startTime,
          endTime,
          acNonAc,
          cost,
          description,
          noOfSeats,
          busType,
          adminstatus,
          availableDate,
          pickupPoints,
          dropPoints
      } = req.body;

      // Create a new bus instance
      const newBus = new Bus({
          userid,
          id,
          busName,
          busFrom,
          busTo,
          startTime,
          endTime,
          acNonAc,
          cost,
          description,
          noOfSeats,
          busType,
          adminstatus,
          availableDate,
          pickupPoints,
          dropPoints
      });

      // Save the new bus entry to the database
      const savedBus = await newBus.save();

      res.status(201).json(savedBus); // Return the saved bus object
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
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
    console.log(req.body)
    const { from, to } = req.body;
  
    if (!from || !to) {
      return res.status(400).json({ msg: "Please provide both source and destination locations" });
    }
  
    Bus.find({ busFrom: from, busTo: to })
      .then((buses) => {
        if (!buses.length) {
          return res.status(404).json({ msg: "No buses found for the provided locations" });
        }
        console.log(buses)
        res.status(200).json(buses);
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

// exports.getbusbylocationdate = (req, res) => {
//   const { from, to, date } = req.body;

//   // Format the date provided by the user (assuming YYYY-MM-DD format)
//   const formattedDate = moment(date, 'YYYY-MM-YYYY').format('YYYY-MM-DD');

//   Bus.find({ busFrom: from, busTo: to }) // Look for buses between these locations
//     .then((buses) => {
//       if (!buses.length) {
//         return res.status(404).json({ msg: "No buses found for the provided locations." });
//       }
//       // const availableBuses = buses.filter((bus) => bus.availableDate?.includes(formattedDate) || !bus.availableDate);
//       const availableBuses = buses.filter((bus) => bus.availableDate?.includes(formattedDate) || !bus.availableDate);

//       // const availableBuses = buses.filter((bus) => bus.availableDate.includes(formattedDate));

//       // Check if any bus is available for the specific date
//       if (availableBuses.length) {
//         res.status(200).json(availableBuses);
//         return; // Exit the function if buses are found for the specific date
//       }

//       // No buses found for the specific date, but check for available dates on other days
//       const allAvailableDates = buses.reduce((acc, bus) => {
//         bus.availableDate.forEach(date => acc.add(date));
//         return acc;
//       }, new Set()); // Use Set to avoid duplicates

//       if (allAvailableDates.size) {
//         // There are available dates on other days, send a message with those dates
//         const availableDatesString = Array.from(allAvailableDates).join(', ');
//         return res.status(200).json({ msg: `No buses found for ${formattedDate}. But buses are available on other dates: ${availableDatesString}` });
//       }

//       // No buses or available dates found
//       res.status(404).json({ msg: "No buses found for the provided locations and date(s)" });
//     })
//     .catch((err) => {
//       console.error("Error finding buses:", err);
//       res.status(500).json({ msg: "Internal Server Error" });
//     });
// };



exports.getbusbylocationdate = (req, res) => {
  const { from, to, date } = req.body;

  // Format the date provided by the user (assuming YYYY-MM-DD format)
  const formattedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

  console.log("Request Data:");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Date:", formattedDate);

  Bus.find({ busFrom: from, busTo: to }) // Look for buses between these locations
    .then((buses) => {
      console.log("Buses found:", buses);

      if (!buses.length) {
        console.log("No buses found for the provided locations.");
        return res.status(404).json({ msg: "No buses found for the provided locations." });
      }

      // Filter available buses for the specific date
      const availableBuses = buses.filter((bus) => {
        console.log("Bus:", bus);
        console.log("Available Date:", bus.availableDate);
        console.log("Formatted Date:", formattedDate);
        // Check if the bus has available dates and if the specified date is included
        return !bus.availableDate || (bus.availableDate && bus.availableDate.includes(formattedDate));
      });

      console.log("Available Buses:", availableBuses);

      // Check if any bus is available for the specific date
      if (availableBuses.length) {
        console.log("Buses found for the specified date:", availableBuses);
        res.status(200).json(availableBuses);
      } else {
        // No buses found for the specific date
        console.log("No buses found for the specified date:", formattedDate);
        res.status(404).json({ msg: `No buses found for ${formattedDate}.` });
      }
    })
    .catch((err) => {
      console.error("Error finding buses:", err);
      res.status(500).json({ msg: "Internal Server Error" });
    });
};