console.log("SERVER 🖥️ STARTED!");

const db = require("./db");
const express = require("express");

const app = express();
app.use(express.static("public"));

// Use if data is fetched using Forms
app.use(express.urlencoded({extended: true})) 

db.initDB();

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
})

app.post("/addUser", (req, res) => {
  const {username} = req.body
  const lowerUsername = username.toLowerCase();
  db.insertUser(lowerUsername, (err) => {
    if (err) {
      return res.status(500).send("Insert Failed!");
    }
    res.send(`USER: ${lowerUsername} ADDED!`);
  })
})

app.get("/getUsers", (req, res) => {
  db.getUsers((err, rows) => {
    res.send(rows)
  })
})