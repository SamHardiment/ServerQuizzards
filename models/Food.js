const db = require("../dbConfig");
module.exports = class Food {
  constructor(data) {
    this.id = data.id;
    this.word = data.word;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM food;");
        const foods = result.rows.map((food) => new Food(food));
        resolve(foods);
      } catch (err) {
        reject("Error retrieving all Foods");
      }
    });
  }
};
