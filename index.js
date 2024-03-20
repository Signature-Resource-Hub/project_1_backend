require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
//PORT
const port = process.env.PORT || 8000;
var userRoutes = require('./routes/user');
//after middleware
app.use('/api', userRoutes);
//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})