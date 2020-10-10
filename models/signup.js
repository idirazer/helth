const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateB: {
    type: Date,
    default: Date.now,
  },
  specialty: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  map: {
    Longitude: String,
    Latitude: String,
  },
  imagepathe: {
    type: String,

  }
});
module.exports = mongoose.model("User", SignupSchema);