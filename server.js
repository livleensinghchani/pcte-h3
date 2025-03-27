console.log("SERVER 🖥️ STARTED!");

const db = require("./db");
const express = require("express");
const path = require('path')


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Use if data is fetched using Forms
app.use(express.urlencoded({extended: true})) 

db.initDB();

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
})

app.get("/home", (req, res) => {
  const cards = []
  res.render('index', { frame: 'home', cards: cards});
})

app.get("/trans", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/trans/index.html'));
})