const Category = require("../models/category");
const Part = require("../models/part");
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

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, parts_list] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Part.find(
      { category: req.params.id },
      "name description price number_in_stock"
    )
      .sort({ name: 1 })
      .exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: category.name,
    category: category,
    parts_list: parts_list,
  });
});
