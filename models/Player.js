const db = require("../dbConfig");
module.exports = class Player {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.points = data.points;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM players;");
        const players = result.rows.map((player) => new Player(player));
        resolve(players);
      } catch (err) {
        reject("Error retrieving all players");
      }
    });
  }
};
