const sqlite = require("sqlite3").verbose();

const DB_FILE_NAME = "database.db"
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
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      label TEXT NOT NULL,
      emoji TEXT NOT NULL,
      category TEXT NOT NULL,
      value REAL DEFAULT 0,
      year INTEGER NOT NULL,
      month INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}

function insertUser(username, callback) {
  db.run("INSERT INTO users (username) VALUES (?)",[username], (err) => {
    if (err) {
      console.error(`❌ INSERT FAILED!: ${err}`)
      callback(err, null)
    } else {
      console.log("✔️ INSERT SUCCESS!")
      callback(null, true)
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

function insertCard(username, label, emoji, category, value, date, callback) {
  db.run("INSERT INTO cards (user_id, label, emoji, category, value, date) VALUES (?)",[username, label, emoji, category, value, date], (err) => {
    if (err) {
      console.error(`❌ INSERT FAILED!: ${err}`)
      callback(err, null)
    } else {
      console.log("✔️ INSERT SUCCESS!")
      callback(null, true)
    }
  })
}

function getCards(username, year, month, ) {

}

module.exports = {
  insertUser,
  getUsers,
  initDB,
  insertCard,
  getCards,

}