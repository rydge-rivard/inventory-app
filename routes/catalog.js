const express = require("express");
const router = express.Router();

const part_controller = require("../controllers/partController");

/// PART ROUTES ///

router.get("/", part_controller.index);

module.exports = router;
