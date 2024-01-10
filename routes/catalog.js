const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");
const category_controller = require("../controllers/categoryController");

/// PART ROUTES ///

router.get("/", part_controller.index);
router.get("/parts_list", part_controller.parts_list);

/// CATEGORY ROUTES ///
router.get("/category_list", category_controller.category_list);

module.exports = router;
