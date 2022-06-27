const Player = require("../models/Player");

async function index(req, res) {
  try {
    console.log("req.body", req.body);
    const users = await Player.all;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
}
module.exports = { index };
