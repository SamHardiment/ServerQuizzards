const Food = require("../models/Food");

async function index(req, res) {
  try {
    console.log("req.body", req.body);
    const foods = await Food.all;
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ err });
  }
}
module.exports = { index };
