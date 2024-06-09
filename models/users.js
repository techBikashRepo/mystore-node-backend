const pool = require("../utils/database");

module.exports = class Users {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  insertUser() {
    return pool.execute("insert into users(username, password) values(?,?)", [
      this.username,
      this.password,
    ]);
  }

  static fetchUserByUsername(username) {
    return pool.execute("select * from users where username=?", [username]);
  }
};
