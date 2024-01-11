const Vehicle = require("../models/vehicle");
const Part = require("../models/part");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.vehicle_list = asyncHandler(async (req, res, next) => {
  const allVehicles = await Vehicle.find({}, "manufacturer model year")
    .sort({ name: 1 })
    .exec();

  res.render("vehicle_list", {
    title: "Rydge's Auto Parts",
    vehicle_list: allVehicles,
  });
});

exports.vehicle_detail = asyncHandler(async (req, res, next) => {
  const [vehicle, parts_list] = await Promise.all([
    Vehicle.findById(req.params.id).exec(),
    Part.find(
      { vehicle: req.params.id },
      "name description price number_in_stock"
    )
      .sort({ name: 1 })
      .exec(),
  ]);

  if (vehicle === null) {
    const err = new Error("Part not found");
    err.status = 404;
    return next(err);
  }

  res.render("vehicle_detail", {
    title: vehicle[0],
    vehicle: vehicle,
    parts_list: parts_list,
  });
});

exports.vehicle_create_get = asyncHandler(async (req, res, next) => {
  res.render("vehicle_form", {
    title: "Create Vehicle",
    vehicle: undefined,
    errors: [],
  });
});

exports.vehicle_create_post = [
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("model", "Model must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("year", "Year must not be empty.")
    .trim()
    .isISO8601("yyyy-mm-dd")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const vehicle = new Vehicle({
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      year: req.body.year,
    });

    if (!errors.isEmpty()) {
      res.render("vehicle_form", {
        title: "Create Vehicle",
        errors: errors.array(),
        vehicle: vehicle,
      });
    } else {
      await vehicle.save();
      res.redirect(vehicle.url);
    }
  }),
];

exports.vehicle_delete_get = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id).exec();

  res.render("vehicle_delete", {
    title: "Delete Vehicle",
    vehicle: vehicle,
  });
});

exports.vehicle_delete_post = asyncHandler(async (req, res, next) => {
  await Vehicle.findByIdAndDelete(req.body.vehicleId);
  res.redirect("/catalog/vehicle_list");
});

exports.vehicle_update_get = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id).exec();

  res.render("vehicle_form", {
    title: "Edit Vehicle",
    vehicle: vehicle,
    errors: [],
  });
});

exports.vehicle_update_post = [
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("model", "Model must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("year", "Year must not be empty.")
    .trim()
    .isISO8601("yyyy-mm-dd")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const vehicle = new Vehicle({
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      year: req.body.year,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("vehicle_form", {
        title: "Edit Vehicle",
        errors: errors.array(),
        vehicle: vehicle,
      });
    } else {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        vehicle,
        {}
      );
      res.redirect(vehicle.url);
    }
  }),
];
