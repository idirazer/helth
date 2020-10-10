const express = require("express");
const router = express.Router();
// const doctorControllerr = require("../controllers/doctorcontrollers");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "doctor";

  next();
});

router.get("/", isLoggedIn, function (req, res) {
  var user = req.user;
  res.render("doctor/index", {
    user: user
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin/"); //// this rout will not worck so go signuproutes ligne 109
}