const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//User model
const User = require("../models/signup");
var expressValidator = require("express-validator5");
router.use(expressValidator())
const myspecialty = require("../models/specialty")
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "signup";

  next();
});

//Signup page
router.get("/", function (req, res) {
  var specialtys = myspecialty.find(function (err, docs) {

    res.render("signup/signup", {
      specialtys: docs

    });
  });
});
//signup post
router.post("/", function (req, res) {
  const {
    name,
    username,
    email,
    password,
    password2,
    birthday,
    specialty,
    address,
  } = req.body;
  let errors = [];
  //check required fileds
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !password2 ||
    !birthday ||
    !specialty ||
    !address
  ) {
    errors.push({
      msg: "please fill in all fields"
    });
  }
  //check password match
  if (password !== password2) {
    errors.push({
      msg: "password do not match "
    });
  }
  //check password length
  if (password.length < 5) {
    errors.push({
      msg: "password should be at least 6 char  caracter"
    });
  }
  //check the validation of the email user
  req.checkBody("email", "invalid Email").isEmail();
  var erroremail = req.validationErrors();
  if (erroremail) {
    errors.push({
      msg: "The Email is invalid"
    });
  }
  if (errors.length > 0) {
    res.render("signup/signup", {
      hasErrors: errors.length > 0,
      errors: errors,
      erroremail,
      name,
      username,
      email,
      password,
      password2,
      birthday,
      specialty,
      address,
    });
  } else {
    //validation passed
    User.findOne({
      email: email
    }).then(function (user) {
      if (user) {
        errors.push({
          msg: "The Email Has Alredy Taked"
        });
        res.render("signup/signup", {
          hasErrors: errors.length > 0,
          errors: errors,
          name,
          username,
          email,
          password,
          password2,
          birthday,
          specialty,
          address,
        });
      } else {
        const newUser = new User({
          name,
          username,
          email,
          password,
          password2,
          birthday,
          specialty,
          address,
        });
        var saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            //set passworsd to heashed
            newUser.password = hash;
            //save the new user in the database
            newUser
              .save()
              .then((user) => {
                req.app.locals.layout = "map";
                var susccess_msg = "you Are now Registred and you can Log In";
                var id = user._id;
                res.render("map/map", {
                  id: id,
                  susccess_msg: susccess_msg,
                  hasMessgs: susccess_msg !== "",
                });
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;