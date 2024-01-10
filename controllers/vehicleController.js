const Vehicle = require("../models/vehicle");
const Part = require("../models/part");
const asyncHandler = require("express-async-handler");

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
