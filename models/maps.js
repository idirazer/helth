const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const MapSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  Longitude: { type: String },
  Latitude: { type: String },
});
module.exports = mongoose.model("Map", MapSchema);
