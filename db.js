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
      username TEXT UNIQUE
    )
  `);
}

function insertUser(username) {
  db.run(`INSERT INTO users (username) VALUES (?)`,[username], (err) => {
    if (err) {
      console.error(`❌ INSERT FAILED!: ${err}`)
    } else {
      console.log("✔️ INSERT SUCCESS!")
    }
  })
}

function getUsers() {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      console.error(`❌ FETCH FAILED!: ${err}`)
    } else {
      return rows
    }
  })
}

module.exports = {
  insertUser,
  getUsers,
  initDB,

}