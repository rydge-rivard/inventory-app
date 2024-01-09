const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  manufacturer: { type: String, required: true, maxLength: 100 },
  model: { type: String, required: true, maxLength: 100 },
  year: { type: Date },
});

VehicleSchema.virtual("url").get(function () {
  return `/catalog/vehicle/${this._id}`;
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
