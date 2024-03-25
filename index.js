require("dotenv").config();
//PORT
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var userUpdateRoutes = require('./routes/user-update');
var userRoutes = require('./routes/user')
//DB Connection
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
//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})