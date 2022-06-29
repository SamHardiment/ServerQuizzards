const Food = require("../models/Food");

async function index(req, res) {
  try {
    const foods = await Food.all;
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ err });
  }
}
module.exports = { index };
