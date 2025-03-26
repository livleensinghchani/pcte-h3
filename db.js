const sqlite = require("sqlite3").verbose();

const DB_FILE_NAME = "users.db"
const db = new sqlite.Database(DB_FILE_NAME, (err) => {
  if (err) {
    console.error("❌ DB CONN FAILED!");
  } else {
    console.log("✔️ DB CONN SUCCESS!");
  }
});

function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL
    )
  `);
}

function insertUser(username, callback) {
  db.run("INSERT INTO users (username) VALUES (?)",[username], (err) => {
    if (err) {
      console.error(`❌ INSERT FAILED!: ${err}`)
      callback(err, null)
    } else {
      console.log("✔️ INSERT SUCCESS!")
      callback(null, username)
    }
  })
}

function getUsers(callback) {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error(`❌ FETCH FAILED!: ${err}`)
      callback(err, null)
    } else {
      console.error(`✔️ FETCH SUCESS!`)
      callback(null, rows)
    }
  })
}

module.exports = {
  insertUser,
  getUsers,
  initDB,

}