const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");
const category_controller = require("../controllers/categoryController");
const vehicle_controller = require("../controllers/vehicleController");

/// PART ROUTES ///

router.get("/", part_controller.index);
router.get("/parts_list", part_controller.parts_list);
router.get("/parts_list/create", part_controller.part_create_get);
router.post("/parts_list/create", part_controller.part_create_post);
router.get("/parts_list/:id", part_controller.part_detail);

/// CATEGORY ROUTES ///
router.get("/category_list", category_controller.category_list);
router.get("/category_list/create", category_controller.category_create_get);
router.post("/category_list/create", category_controller.category_create_post);
router.get("/category_list/:id", category_controller.category_detail);

/// VEHICLE ROUTES ///
router.get("/vehicle_list", vehicle_controller.vehicle_list);
router.get("/vehicle_list/create", vehicle_controller.vehicle_create_get);
router.post("/vehicle_list/create", vehicle_controller.vehicle_create_post);
router.get("/vehicle_list/:id", vehicle_controller.vehicle_detail);
router.get("/vehicle_list/:id/delete", vehicle_controller.vehicle_delete_get);
router.post("/vehicle_list/:id/delete", vehicle_controller.vehicle_delete_post);
router.get("/vehicle_list/:id/update", vehicle_controller.vehicle_update_get);
router.post("/vehicle_list/:id/update", vehicle_controller.vehicle_update_post);

module.exports = router;
