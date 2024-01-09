const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true },
  vehicle: [{ type: Schema.Types.ObjectId, ref: "Vehicle", required: true }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

PartSchema.virtual("url").get(function () {
  return `/catalog/part/${this._id}`;
});

module.exports = mongoose.model("Part", PartSchema);
