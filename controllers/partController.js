const Part = require("../models/part");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Rydge's Auto Parts" });
});
