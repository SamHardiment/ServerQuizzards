const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food");

router.get("/", foodController.index);

module.exports = router;
