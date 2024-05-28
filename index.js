require("dotenv").config();

const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var userUpdateRoutes = require('./routes/user-update');
var userRoutes = require('./routes/user')
var blogRoutes = require('./routes/blog')
var orderRoutes = require('./routes/order')
var review = require('./routes/review')


mongoose
    .connect(process.env.DATABASE, {})
    .then(() => {
        console.log("DB CONNECTED"); 
    });
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//after middleware
app.use('/api', userUpdateRoutes);
app.use('/api', userRoutes);
app.use('/api',blogRoutes);
app.use('/api',orderRoutes);
app.use('/api',review);
//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})