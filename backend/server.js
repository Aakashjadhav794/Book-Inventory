const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;
const DB_FILE = "./db.json";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Inventory Backend is running 🚀");
});

const readDB = () =>
  JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

const writeDB = (data) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// GET all books
app.get("/books", (req, res) => {
  res.json(readDB().books);
});

// GET book by id
app.get("/books/:id", (req, res) => {
  const book = readDB().books.find(
    (b) => b.id == req.params.id
  );
  res.json(book);
});

// ADD book
app.post("/books", (req, res) => {
  const db = readDB();
  const newBook = { id: Date.now(), ...req.body };
  db.books.push(newBook);
  writeDB(db);
  res.json(newBook);
});

// UPDATE book
app.put("/books/:id", (req, res) => {
  const db = readDB();
  db.books = db.books.map((b) =>
    b.id == req.params.id ? { ...b, ...req.body } : b
  );
  writeDB(db);
  res.json({ success: true });
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const db = readDB();
  db.books = db.books.filter(
    (b) => b.id != req.params.id
  );
  writeDB(db);
  res.json({ success: true });
});

app.listen(PORT, () =>
  console.log("Demo backend running on", PORT)
);
