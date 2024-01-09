const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");

/// PART ROUTES ///

router.get("/", part_controller.index);
router.get("/parts_list", part_controller.parts_list);

module.exports = router;
