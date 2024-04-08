//const user = require('../models/user');
var User = require('../models/user');
const bcrypt = require('bcrypt')
exports.getUser=(req,res)=>{
    User.findOne({_id:req.body.userId}).then((user)=>{
        if (user) {
        console.log(user)
            res.status(200).json(user);
        }
        else {
            console.log("err")
            return res.status(400).json({ 'msg': "Internal error" });
        }
    });
} 
// Update username
exports.updateUser = (req, res) => {
    console.log(req.body)
    const { username } = req.body;
    // Validate username
    if (!username || username.length > 10) {
        return res.status(400).json({ 'msg': 'Should be less than 10 letters' });
    }
// Update username in the database
    User.findByIdAndUpdate(req.body._id, { username }, { new: true }).then((user) => {

        if (user) {
            res.status(200).json(user);
        }
        else {
            return res.status(400).json({ 'msg': err.message });
        }
    });
};
// Update email
exports.updateEmail = (req, res) => {
    const { email } = req.body;
    console.log(email)
    // Validate email
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ 'msg': 'Invalid email' });
    }
    // Update email in the database
    User.findByIdAndUpdate(req.body.id, { email }, { new: true }).then((user) => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            return res.status(400).json({ 'msg': err.message });
        }
    });
};
// Helper function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// Update phone number
exports.updatePhone = (req, res) => {
    const { phone } = req.body;
    // Validate phone number
    if (!phone || isNaN(phone) || phone.toString().length !== 10) {
        return res.status(400).json({ 'msg': 'Should contain 10 digit' });
    }
    // Update phone number in the database
    User.findByIdAndUpdate(req.body.id, { phone }, { new: true }).then((user) => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            console.log(err)
            return res.status(400).json({ 'msg': err.message });
        }
    });
};

exports.updatePassword = async (req, res) => {
    const currentPassword =  req.body.currentPassword;
    const newPassword =  req.body.newPassword;
    const _id = req.body._id; // Assuming you have userId in the request body
    // Validation checks for empty fields
    console.log(currentPassword)
    console.log(_id)
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ msg: 'Please provide both current password and new password' });
    }
    try {
        // Fetch the user from the database
        const user = await User.findById(_id);
        console.log(user);
        // Check if user is found
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Check if the current password matches the stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
        console.log("not matched")
            return res.status(400).json({ msg: 'Current password is incorrect' });
            
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        res.json({ msg: 'Password updated successfully' });
        console.log("matched")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.forgotPassword = (req, res) => {
    const { email, newPassword } = req.body;
    // Validate new password
    if (!newPassword || newPassword.trim() === '') {
        return res.status(400).json({ msg: 'Please enter a password' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
    }
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) throw err;
                // Set the new hashed password
                user.password = hash;
                // Save the updated user with the new password
                user.save().then(() => {
                    res.status(200).json({ msg: 'Password updated successfully' });
                }).catch(err => {
                    res.status(500).json({ msg: 'Failed to update password', error: err });
                });
            });
        });
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error', error: err });
    });
};