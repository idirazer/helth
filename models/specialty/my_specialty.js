var myspecailty = require("../specialty");

const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/Health_CareDB", {
    useNewUrlParser: true
  })
  .then((response) => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Database connection failed.");
  });

var myspecailtys = [
  new myspecailty({
    name_of_specialty: "Cardiolog",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Child & Adolescent Psychiatry",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Family Medicine",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Hand Surgery ",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Neurology",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Allergy & Immunology",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Biochemical Genetics ",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Colon & Rectal Surgery",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Congenital Cardiac Surgery ",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Cytopathology ",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Radiology-Diagnostic",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Sleep Medicine",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),
  new myspecailty({
    name_of_specialty: "Ophthalmology",
    image_pathe: "/picturs/speciality/family medicien.jpg"
  }),

];
var done = 0;
for (var i = 0; i < myspecailtys.length; i++) {
  myspecailtys[i].save(function (err, result) {
    done++;
    if (done === myspecailtys.length) {
      exit();
    }
  });

  function exit() {
    mongoose.disconnect();
  }
}