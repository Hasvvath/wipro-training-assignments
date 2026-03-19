const express = require('express');
const router = express.Router();

// In-memory data
let books = [
    { id: 1, title: "1984", author: "Orwell" },
    { id: 2, title: "The Alchemist", author: "Coelho" }
];

// =======================
// GET all books
// =======================
router.get('/', (req, res) => {
    res.json(books);
});

// =======================
// GET book by ID
// =======================
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.json(book);
});

// =======================
// POST new book
// =======================
router.post('/', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).send("Title and Author required");
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// =======================
// PUT update book
// =======================
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// =======================
// DELETE book
// =======================
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).send("Book not found");
    }

    books.splice(index, 1);
    res.send("Book deleted successfully");
});

module.exports = router;