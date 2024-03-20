// Import the User model
const User = require('../models/user');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// Registration function
exports.registerUser = (req, res) => {
  // Extract data from the request body
  const { username, email, password, phone } = req.body;
  console.log(password)
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
      // If the user does not exist, hash the password and create a new user
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          console.log("bcrypt err1", err)
          return res.status(500).json({ msg: "Internal Server Error" });
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            console.log("bcrypt err", err)
            return res.status(500).json({ msg: "Internal Server Error" });
          }
          // Create a new user instance
          const newUser = new User({
            username,
            email,
            password: hash, // Store the hashed password
            phone,
          });
          // Save the new user to the database
          newUser.save()
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((err) => {
              console.log("catch error", err)
              res.status(500).json({ msg: err });
            });
        });
      });
    })
    .catch((err) => {
      console.log("catch error 2")
      res.status(500).json({ msg: "Internal Server Error" });
    });
};
// Login function
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
