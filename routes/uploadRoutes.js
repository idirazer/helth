const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Map = require("../models/maps");
const doctors_list = require("../models/signup")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeG' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "upload";

  next();
});

router.get("/", function (req, res) {
  res.render("uploadd/upload");
});
router.post("/image/:id", upload.single('image'), function (req, res, next) {
  var docotrId = req.params.id;
  var docotrIdd = docotrId.toString();
  var id = mongoose.Types.ObjectId(docotrIdd);
  console.log(id);
  var path1 = req.file.path
  var path2 = path1.slice(14)
  var path = ("/upload/" + path2)
  doctors_list.findByIdAndUpdate(
    id, {
      imagepathe: path
    },
    function (err, docs) {
      console.log(docs)
      req.app.locals.layout = "doctor";
      res.render("doctor/index", {
        user: docs
      });
    }
  )
})

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin/"); //// this rout will not worck so go signuproutes ligne 109
}