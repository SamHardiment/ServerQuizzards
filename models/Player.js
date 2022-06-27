const db = require("../dbConfig");
module.exports = class User {
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
        const result = await db.query("SELECT * FROM users;");
        const users = result.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving all users");
      }
    });
  }
};
