const db = require("../dbConfig");
module.exports = class Animal {
  constructor(data) {
    this.id = data.id;
    this.word = data.word;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM animals;");
        const animals = result.rows.map((animal) => new Animal(animal));
        resolve(animals);
      } catch (err) {
        reject("Error retrieving all animals");
      }
    });
  }
};
