const Part = require("../models/part");
const Vehicle = require("../models/vehicle");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Rydge's Auto Parts" });
});

exports.parts_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find(
    {},
    "name vehicle description price number_in_stock"
  )
    .sort({ name: 1 })
    .populate("vehicle")
    .exec();

  res.render("parts_list", {
    title: "Rydge's Auto Parts",
    parts_list: allParts,
  });
});

exports.part_detail = asyncHandler(async (req, res, next) => {
  const part = await Promise.all([
    Part.findById(req.params.id)
      .populate("category")
      .populate("vehicle")
      .exec(),
  ]);

  if (part === null) {
    const err = new Error("Part not found");
    err.status = 404;
    return next(err);
  }

  res.render("part_detail", {
    title: part.name,
    part: part,
  });
});

exports.part_create = asyncHandler(async (req, res, next) => {
  const [vehicles, categories] = await Promise.all([
    Vehicle.find({}).sort({ manufacturer: 1 }).exec(),
    Category.find({}, "name").sort({ name: 1 }).exec(),
  ]);

  res.render("part_form", {
    title: "Create Part",
    categories: categories,
    vehicles: vehicles,
  });
});
