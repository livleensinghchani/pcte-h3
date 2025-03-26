console.log("SERVER 🖥️ STARTED!");

const db = require("./db");
const express = require("express");

const app = express();
app.use(express.static("public"));

db.initDB();

