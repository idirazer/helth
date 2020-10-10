//jshint esversion:6
//Impoting different modules :
//Express
const express = require("express");
//Mpngoose
const mongoose = require("mongoose");
//Express Validator
var validator = require("express-validator");
//Path
const path = require("path");
//Express hanldebares
const hbs = require("express-handlebars");
//Body-Barser
var bodyparser = require("body-parser");
//sesion pakage
var session = require("express-session");
//Passport
var passport = require("passport");
//Flash Messeges
var flash = require("connect-flash");
/////////////////////////////////////////////////////////////
var logger = require('morgan');
//Connexion to the databasse
const {
  mongoDbUrl,
  PORT
} = require("./config/configuration");

const app = express();
require("./config/passport");
//configuration mongoose to connect with mongoDB//
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true
  })
  .then((response) => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Database connection failed.");
  });

//configuration express//
app.use(logger('dev'));
app.use(express.json());
// // app.use(validator());
//configuration of body-parser  !!body-parser is included inside express!!//
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
//configuration session
app.use(
  session({
    secret: "mysupersecret",
    resave: true,
    saveUninitialized: false,
    resave: true,
  })
);
//configuration passport
app.use(passport.initialize());
app.use(passport.session());

//configuration flash
app.use(flash());
//creat Glocal varibale
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

/* setup view engine to use        handlebars*/
app.engine("handlebars", hbs({
  defaultLayout: "default"
}));
app.set("view engine", "handlebars");
///////////////////////////////////////////////////+

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


////////////////////////////

/* Our Routes*/
const defaultRoutes = require("./routes/defaultRoutes");
const signinRoutes = require("./routes/signinRoutes");
const signupRoutes = require("./routes/signupRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const mapRoutes = require("./routes/mapRoutes");
const specialityRoutes = require("./routes/doctorsRoutes");
const each_doctors = require("./routes/each_doctor");
const uploadRoutes = require("./routes/uploadRoutes");
//////////////////////
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var indexRouterD = require('./routes/indexD');
var usersRouterD = require('./routes/usersD');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/D', indexRouterD);
app.use('/usersD', usersRouterD);


app.use("/healthcare", defaultRoutes);
app.use("/signin", signinRoutes);
app.use("/signup", signupRoutes);
app.use("/doctor", doctorRoutes);
app.use("/map", mapRoutes);
app.use("/speciality", specialityRoutes);
app.use("/each_doctor", each_doctors);
app.use("/upload", uploadRoutes)

/* Start The Server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});