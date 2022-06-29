const express = require("express");
const router = express.Router();
const randomController = require("../controllers/random");

router.get("/", randomController.index);

module.exports = router;
