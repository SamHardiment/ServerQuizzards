const db = require("../dbConfig");
module.exports = class Random {
  constructor(data) {
    this.id = data.id;
    this.word = data.word;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM random;");
        const randoms = result.rows.map((random) => new Random(random));
        resolve(randoms);
      } catch (err) {
        reject("Error retrieving all randoms");
      }
    });
  }
};
