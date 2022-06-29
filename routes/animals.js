const express = require("express");
const router = express.Router();
const animalsController = require("../controllers/animals");

router.get("/", animalsController.index);

module.exports = router;
