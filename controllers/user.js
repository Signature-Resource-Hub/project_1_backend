// Import the User model
const User = require('../models/user');
const Travel=require('../models/travel');
const Hotel=require('../models/hotel')
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
              if (user.user_type === "travells") {
                console.log(user._id)
                const { travelsname, travelsplace, travelsdistrict, travelspincode, travelslicense } = req.body;
                const newTravel = new Travel({
                  travelsname,
                  travelsplace,
                  travelsdistrict,
                  travelspincode,
                  travelslicense,
                  userid: user._id // Assuming userid is the reference to the user who owns this travel document
                });

                // Save the new travel document to the database
                return newTravel.save().then((travel) => {
                  // If travel document was created, you can handle the response accordingly
                  if (travel) {
                    res.status(201).json({ msg: "User and travel details registered successfully"});
                  } else {
                    res.status(400).json({ msg: "Internal server error"});
                  }
                })
                .catch((err) => {
                  console.error("Error saving travel details:", err);
                  res.status(500).json({ msg: "Internal Server Error" });
                });
              }
            else if (user.user_type === "hotels") {
              // Extract hotel details from the request body
              const { hotelname, hotelplace, hoteldistrict, hotelpincode, hotellicense } = req.body;

              // Create a new hotel instance
              const newHotel = new Hotel({
                hotelname,
                hotelplace,
                hoteldistrict,
                hotelpincode,
                hotellicense,
                userid: user._id
              });

              // Save the new hotel document to the database
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
            } else {
              // Return a resolved promise if no travel or hotel document needs to be created
              return Promise.resolve();
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
