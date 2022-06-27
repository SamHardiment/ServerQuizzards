const db = require("../dbConfig");
module.exports = class Player {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.create_date = data.create_date;
  }
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM players;");
        const users = result.rows.map((user) => new Player(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving all users");
      }
    });
  }
};
