const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Map = require("../models/maps");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "map";

  next();
});

router.get("/", isLoggedIn, function (req, res) {
  res.render("map/map");
});
router.post("/map", function (req, res) {
  const {
    id_user,
    Longitude,
    Latitude
  } = req.body;
  var id = id_user
  console.log(id_user);
  console.log(Longitude);
  console.log(Latitude);
  let errors = [];
  if (!id_user || !Longitude || !Latitude) {
    errors.push({
      msg: "pelease chose a place first "
    });
    res.render("map/map", {
      errors: errors,
    });
  } else {
    const newMap = new Map({
      id_user,
      Longitude,
      Latitude
    });

    newMap.save()
      .then((id) => {
        req.app.locals.layout = "upload";


        console.log(id.id_user + 'ididid');
        res.render("uploadd/upload", {
          id: id.id_user,
        });
      });

    console.log("very good");
  }
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin/"); //// this rout will not worck so go signuproutes ligne 109
}