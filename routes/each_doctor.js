const express = require("express");
const router = express.Router();
const myspecialty = require("../models/specialty");
const doctors_list = require("../models/signup");
const map = require("../models/maps");

router.all("/*", (req, res, next) => {
 req.app.locals.layout = "each_doctor";
 next();
});

router.get("/:id", function (req, res, next) {
 //GET THE ID OF THE DOCTOR
 var doctor_id = req.params.id;

 var the_doctor;
 let doctors = [];
 // FIN THE DOCTOR BY ID 
 doctors_list.find({
  //THE CONDITION 
  _id: doctor_id
 }, function (err, docss) {
  // GET THE SPECIALTY OF OUR DOCTOR FOR GETTING THE ATHOR DOCTORS IN THIS SPECIALTY 
  let specialtyy = docss[0].specialty;
  let specialty = specialtyy.toString();
  // FIND THE DOCTORS BY USING THE ID OF SPECIALTY
  doctors_list.find({
   specialty: specialty
  }, function (err, docs) {
   // ARRAY FOR RANDOM NUMBERS
   let random = [];
   for (i = 0; i < docs.length; i++) {
    // GETTING THE RENDOM NUMBER AND CONVERT HIM WITHOUT VERGEL BY ceil() FUNCTION
    let index = (Math.ceil(Math.random() * 10))

    if (index < docs.length) {
     // FOR NOT REPETING THE SAME RANDOM NUMBER
     if (!random.includes(index)) {
      console.log(!random.includes(index))
      random.push(index);
      doctors.push(docs[index])


     }
    }
    console.log(random)
   }

   map.find({
    id_user: doctor_id
   }, function (err, map) {
    console.log(map)
    res.render("doctors/eachDoctor/index", {
     doctors: doctors,
     doctor: docss,
     map: map

    });

   })


  })


 })


});
module.exports = router;