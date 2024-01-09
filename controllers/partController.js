const Part = require("../models/part");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // const []
  res.render("part_list", { title: "Rydge's Auto Parts" });
});
