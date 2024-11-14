var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var cors = require('cors');  // Import the cors module


var adminRouter = require('./routes/adminRoute');
var usersRouter = require('./routes/userRoute');

var app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type,Authorization',
    // preflightContinue: false,
    // optionsSuccessStatus: 204
};
  
  app.use(cors(corsOptions)); // Use the CORS middleware with the specified options
  


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/user', usersRouter);
// router.get("/signup",(req,res)=>{
//     console.log("hiiiiiiiiiiiiiiiiiiii")
  
// })


module.exports = app;
