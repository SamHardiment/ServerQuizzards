const Animal = require("../models/Animal");

async function index(req, res) {
  try {
    const animals = await Animal.all;
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ err });
  }
}
module.exports = { index };
