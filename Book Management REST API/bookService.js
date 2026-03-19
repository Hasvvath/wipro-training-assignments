const fs = require("fs").promises;
const path = require("path");
const EventEmitter = require("events");

const emitter = new EventEmitter();

// ✅ file in same folder
const filePath = path.join(__dirname, "books.json");

// Events
emitter.on("added", () => console.log("Book Added"));
emitter.on("updated", () => console.log("Book Updated"));
emitter.on("deleted", () => console.log("Book Deleted"));

// Read
const readBooks = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

// Write
const writeBooks = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// GET all
exports.getAllBooks = async () => {
  return await readBooks();
};

// GET by ID
exports.getBookById = async (id) => {
  const books = await readBooks();
  return books.find(b => b.id == id);
};

// ADD
exports.addBook = async (title, author) => {
  const books = await readBooks();

  const newBook = {
    id: Date.now(),
    title,
    author
  };

  books.push(newBook);
  await writeBooks(books);

  emitter.emit("added");

  return newBook;
};

// UPDATE
exports.updateBook = async (id, data) => {
  const books = await readBooks();
  const index = books.findIndex(b => b.id == id);

  if (index === -1) return null;

  books[index] = { ...books[index], ...data };
  await writeBooks(books);

  emitter.emit("updated");

  return books[index];
};

// DELETE
exports.deleteBook = async (id) => {
  const books = await readBooks();
  const newBooks = books.filter(b => b.id != id);

  if (books.length === newBooks.length) return false;

  await writeBooks(newBooks);

  emitter.emit("deleted");

  return true;
};