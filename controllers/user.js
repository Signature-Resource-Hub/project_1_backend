// Import the User model
// const User = require('../models/user');
// var jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// // Registration function
// exports.registerUser = (req, res) => {
//   // Extract data from the request body
//   const { username, email, password, phone } = req.body;
//   console.log(password)
//   // Check if all mandatory fields are provided
//   if (!username || !email || !phone || !password) {
//     return res.status(400).json({ msg: "Please add all mandatory fields" });
//   }
//   // Check if the user already exists
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         return res.status(400).json({ msg: "The user already exists" });
//       }
//       // If the user does not exist, hash the password and create a new user
//       bcrypt.genSalt(10, function (err, salt) {
//         if (err) {
//           console.log("bcrypt err1", err)
//           return res.status(500).json({ msg: "Internal Server Error" });
//         }
//         bcrypt.hash(password, salt, function (err, hash) {
//           if (err) {
//             console.log("bcrypt err", err)
//             return res.status(500).json({ msg: "Internal Server Error" });
//           }
//           // Create a new user instance
//           const newUser = new User({
//             username,
//             email,
//             password: hash, // Store the hashed password
//             phone,
//           });
//           // Save the new user to the database
//           newUser.save()
           
//         });
//       });
//     })
//     .catch((err) => {
//       console.error("Error finding user:", err);
//       res.status(500).json({ msg: "Internal Server Error" });
//     });
// };
// // Login function
// exports.loginUser = (req, res) => {
//   // Extract email and password from the request body
//   const { email, password } = req.body;
//   // Find user by email
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }
//       // Compare password
//       console.log(user.password)
//       console.log(password)
//       bcrypt.compare(password, user.password)
//         .then((isMatch) => {
//           if (!isMatch) {
//             console.log("is match error")
//             return res.status(400).json({ msg: "Invalid credentials" });
//           }
//           // If password is correct, create JWT token
//           const payload = {
//             id: user._id,
//             email: user.email,
//             user_type: user.user_type,
//           };
//           jwt.sign(
//             payload,
//             "your_secret_key",
//             { expiresIn: "1h" },
//             (err, token) => {
//               if (err) {
//                 throw err;
//               }
//               res.json({
//                 token,
//                 user: {
//                   id: user._id,
//                   username: user.username,
//                   email: user.email,
//                 },
//               });
//               //res.cookie("token",token);
//             }
//           );
//         })
//         .catch((err) => {
//           console.log(err)
//           res.status(500).json({ msg: "Internal Server Error" });
//         });
//     })
//     .catch((err) => {
//       console.log(err)
//       res.status(500).json({ msg: "Internal Server Error" });
//     });
// };
// Import the User model
const User = require('../models/user');
const Travel=require('../models/travel');
const Hotel=require('../models/hotel');
// const Hotel=require('../models/hotel')
const Travelguide=require('../models/guidereg');
const Blogger=require('../models/blogger');

// const Travel=require('../models/travel');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// Registration function
exports.registerUser = (req, res) => {
  // Extract data from the request body
  const { username, email, password, phone, user_type } = req.body;

  // Check if all mandatory fields are provided
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ msg: "Please add all mandatory fields" });
  }

  // Check if the user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: "The user already exists" });
      }

      // Hash the password
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          console.error("bcrypt error", err);
          return res.status(500).json({ msg: "Internal Server Error" });
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            console.error("bcrypt error", err);
            return res.status(500).json({ msg: "Internal Server Error" });
          }

          // Create a new user instance
          const newUser = new User({
            username,
            email,
            password: hash, // Store the hashed password
            phone,
            user_type
          });

          // Save the new user to the database
          newUser.save()
            .then((user) => {
              // Handle different user types
              if (user.user_type === "travells") {
                const { travelsname, travelsplace, travelsdistrict, travelspincode, travelslicense } = req.body;
                const newTravel = new Travel({
                  travelsname,
                  travelsplace,
                  travelsdistrict,
                  travelspincode,
                  travelslicense,
                  userid: user._id // Reference to the user
                });

                return newTravel.save().then((travel) => {
                  if (travel) {
                    res.status(201).json({ msg: "User and travel details registered successfully" });
                  } else {
                    res.status(400).json({ msg: "Internal server error" });
                  }
                })
                .catch((err) => {
                  console.error("Error saving travel details:", err);
                  res.status(500).json({ msg: "Internal Server Error" });
                });

              } else if (user.user_type === "hotels") {
                const { hotelname, hotelplace, hoteldistrict, hotelpincode, hotellicense } = req.body;
                const newHotel = new Hotel({
                  hotelname,
                  hotelplace,
                  hoteldistrict,
                  hotelpincode,
                  hotellicense,
                  userid: user._id
                });

                return newHotel.save().then((hotel) => {
                  if (hotel) {
                    res.status(201).json({ msg: "User and hotel details registered successfully" });
                  } else {
                    res.status(400).json({ msg: "Internal server error" });
                  }
                })
                .catch((err) => {
                  console.error("Error saving hotel details:", err);
                  res.status(500).json({ msg: "Internal Server Error" });
                });

              } else if (user.user_type === "guide") {
                const { guidename, address, street, guidepincode,image} = req.body;
                const newGuide = new Travelguide({
                  guidename,
                  address,
                  street,
                  guidepincode,
                  image,
                  userid: user._id // Reference to the user
                });

                return newGuide.save().then((guide) => {
                  if (guide) {
                    res.status(201).json({ msg: "User and guide details registered successfully" });
                  } else {
                    res.status(400).json({ msg: "Internal server error" });
                  }
                })
                .catch((err) => {
                  console.error("Error saving guide details:", err);
                  res.status(500).json({ msg: "Internal Server Error" });
                });

              } else if (user.user_type === "blogger") {
                const { bloggername, address, street, pincode,image} = req.body;
                const newBlogger = new Blogger({
                  bloggername,
                  address,
                  street,
                  pincode,
                  image,
                  userid: user._id // Reference to the user
                });

                return newBlogger.save().then((blogger) => {
                  if (blogger) {
                    res.status(201).json({ msg: "User  details registered successfully" });
                  } else {
                    res.status(400).json({ msg: "Internal server error" });
                  }
                })
                .catch((err) => {
                  console.error("Error saving guide details:", err);
                  res.status(500).json({ msg: "Internal Server Error" });
                });

              } 
              
              else {
                // Handle other user types or if no additional details need to be saved
                res.status(201).json({ msg: "User registered successfully" });
              }
            })
            .catch((err) => {
              console.error("Error saving user details:", err);
              res.status(500).json({ msg: "Internal Server Error" });
            });
        });
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ msg: "Internal Server Error" });
    });
};

exports.loginUser = (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  // Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      // Compare password
      console.log(user.password)
      console.log(password)
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            console.log("is match error")
            return res.status(400).json({ msg: "Invalid credentials" });
          }
          // If password is correct, create JWT token
          const payload = {
            id: user._id,
            email: user.email,
            user_type: user.user_type,
          };
          jwt.sign(
            payload,
            "your_secret_key",
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                throw err;
              }
              res.json({
                token,
                user: {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                  //phone: user.phone
                },
              });
              //res.cookie("token",token);
            }
          );
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ msg: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Internal Server Error" });
    });
};