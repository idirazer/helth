const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpecialtySchema = new Schema({
 name_of_specialty: {
  type: String,
  required: true,
 },
 image_pathe: {
  type: String,

 },
});
module.exports = mongoose.model("Specialty", SpecialtySchema);