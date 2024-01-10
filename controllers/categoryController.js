const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description")
    .sort({ name: 1 })
    .exec();

  res.render("category_list", {
    title: "Rydge's Auto Parts",
    category_list: allCategories,
  });
});
