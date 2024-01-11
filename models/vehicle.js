const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  manufacturer: { type: String, required: true, maxLength: 100 },
  model: { type: String, required: true, maxLength: 100 },
  year: { type: Date },
});

VehicleSchema.virtual("url").get(function () {
  return `/catalog/vehicle_list/${this._id}`;
});

VehicleSchema.virtual("year_formatted").get(function () {
  return DateTime.fromJSDate(this.year).toLocaleString(DateTime.DATE_SHORT);
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
