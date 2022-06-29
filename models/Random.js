const db = require("../dbConfig");
module.exports = class Random {
  constructor(data) {
    this.id = data.id;
    this.random = data.random;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const random = await db.query("SELECT * FROM random;");
        const randoms = result.rows.map((random) => new Animal(random));
        resolve(randoms);
      } catch (err) {
        reject("Error retrieving all randoms");
      }
    });
  }
};
