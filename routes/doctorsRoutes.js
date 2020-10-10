const express = require("express");
const router = express.Router();
const myspecialty = require("../models/specialty")
const doctors_list = require("../models/signup")



router.all("/*", (req, res, next) => {
  req.app.locals.layout = "speciality";
  next();
});

router.get("/", function (req, res, next) {
  myspecialty.find({}, {
    _id: 1,
    name_of_specialty: 1,
    image_pathe: 1

  }, function (err, docs) {
    // var lsitdctor = [];
    // var doctorsize = 1;
    // for (var i = 0; i < docs.length; i += doctorsize) {
    //   lsitdctor.push(docs.slice(i, i + doctorsize))
    // }


    console.log(docs);


    res.render("doctors/speciality/index", {
      specialtys: docs
    });
  })
});
router.get("/doctor_special/:id", function (req, res, next) {
  var docotrId = req.params.id;

  var doctors = doctors_list.find({
      "specialty": docotrId
    },
    function (err, docs) {
      myspecialty.findOne({
        "_id": docotrId
      }, {
        name_of_specialty: 1
      }, function (err, names) {
        console.log(names);
        myspecialty.find({}, {
            _id: 1,
            name_of_specialty: 1,
            image_pathe: 1

          },
          function (err, secendnames) {
            req.app.locals.layout = "listDoctor";
            res.render("doctors/listDoctor/index", {
              doctors: docs,
              namespecialty: names,
              secendnames: secendnames
            });
          })


      })

    });
});

module.exports = router;