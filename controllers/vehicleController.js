const Vehicle = require("../models/vehicle");
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
