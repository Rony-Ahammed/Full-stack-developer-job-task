const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ROny@my#sql",
  database: "test",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", upload.array("file", 5), (req, res) => {
  console.log("Received files:", req.files);

  res.send("Files uploaded successfully");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addUser", (req, res) => {
  const { email, password, type } = req.body;
  const active = 1;
  const sql =
    "INSERT INTO users (email, password, type, active) VALUES (?, ?, ?, ?)";
  db.query(sql, [email, password, type, active], (err, result) => {
    if (err) {
      console.error("Failed to add user:", err);
      res.status(500).send("Error adding user");
    } else {
      console.log("User added successfully");
      res.status(200).send("User added successfully");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
