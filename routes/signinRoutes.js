const express = require("express");
const router = express.Router();

var passport = require("passport");
// const singinControllerr = require('../controllers/singincontrollers');
var expressValidator = require("express-validator5");
router.use(expressValidator())
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "signin";
  next();
});

///////////logout page
router.get("/logout", function (req, res, next) {
  req.logOut();
  res.redirect("/");
});
router.use("/", notLoggedIn, function (req, res, next) {
  next();
});
///////////signin page
router.get("/", function (req, res, next) {
  var messages = req.flash("error");
  res.render("signin/signin", {
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

/////////signin in Handel
router.post(
  "/",
  passport.authenticate("local.signinH", {

    successRedirect: ("/doctor/"),
    failureRedirect: "/signin/",
    failureFlash: true,
  })
);

module.exports = router;



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/doctor/");
}