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
var userRoutes = require('./routes/user');
var userUpdateRoutes = require('./routes/user-update');
var guideRoutes = require('./routes/guideroutes');
var busroutes=require('./routes/busroutes');
var userbusreview=require('./routes/userbusreview');
var userguidereview=require('./routes/guidereview');

//after middleware
app.use('/api', userRoutes);

app.use('/api',blogRoutes);
app.use('/api',orderRoutes);
app.use('/api',review);

app.use('/api',guideRoutes);
app.use('/api',busroutes);
app.use('/api', userUpdateRoutes);
app.use('/api', userbusreview);
app.use('/api', userguidereview);



//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})