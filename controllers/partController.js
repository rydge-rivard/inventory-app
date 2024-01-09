const Part = require("../models/part");
const Vehicle = require("../models/vehicle");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Rydge's Auto Parts" });
});

exports.parts_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find({}, "name vehicle description price")
    .sort({ name: 1 })
    .populate("vehicle")
    .exec();

  res.render("parts_list", {
    title: "Rydge's Auto Parts",
    parts_list: allParts,
  });
});
