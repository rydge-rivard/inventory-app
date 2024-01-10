const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");
const category_controller = require("../controllers/categoryController");
const vehicle_controller = require("../controllers/vehicleController");

/// PART ROUTES ///

router.get("/", part_controller.index);
router.get("/parts_list", part_controller.parts_list);

/// CATEGORY ROUTES ///
router.get("/category_list", category_controller.category_list);

/// CATEGORY ROUTES ///
router.get("/vehicle_list", vehicle_controller.vehicle_list);

module.exports = router;
