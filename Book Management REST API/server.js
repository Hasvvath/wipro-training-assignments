const express = require("express");
const bookService = require("./bookService"); // ✅ changed

const app = express();
const PORT = 3000;

app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Management API" });
});

// GET all
app.get("/books", async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = await bookService.addBook(title, author);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/books/:id", async (req, res) => {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});