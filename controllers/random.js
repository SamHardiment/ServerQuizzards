const Random = require("../models/Random");

async function index(req, res) {
  try {
    console.log("req.body", req.body);
    const randoms = await Random.all;
    res.status(200).json(randoms);
  } catch (err) {
    res.status(500).json({ err });
  }
}
module.exports = { index };
