const Part = require("../models/part");
const Vehicle = require("../models/vehicle");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.part_create_get = asyncHandler(async (req, res, next) => {
  const [vehicles, categories] = await Promise.all([
    Vehicle.find({}).sort({ manufacturer: 1 }).exec(),
    Category.find({}, "name").sort({ name: 1 }).exec(),
  ]);

  res.render("part_form", {
    title: "Create Part",
    categories: categories,
    vehicles: vehicles,
    errors: [],
    part: undefined,
  });
});

exports.part_create_post = [
  body("part_name", "Part Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("inventory", "Inventory must greater than or equal to zero.")
    .trim()
    .isNumeric({ min: 0 })
    .escape(),
  body("price", "Price must greater than or equal to zero.")
    .trim()
    .isNumeric({ min: 0 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const part = new Part({
      name: req.body.part_name,
      vehicle: req.body.vehicle,
      category: req.body.category,
      description: req.body.descr,
      price: req.body.price,
      number_in_stock: req.body.inventory,
    });

    if (!errors.isEmpty()) {
      const [vehicles, categories] = await Promise.all([
        Vehicle.find().sort({ manufacturer: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      res.render("part_form", {
        title: "Create Part",
        categories: categories,
        vehicles: vehicles,
        errors: errors.array(),
        part: part,
      });
    } else {
      await part.save();
      res.redirect(part.url);
    }
  }),
];
