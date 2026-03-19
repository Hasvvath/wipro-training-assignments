const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// =======================
// Custom Logging Middleware
// =======================
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${req.method}] ${req.url} - ${time}`);
    next();
});

// =======================
// Basic Routes
// =======================

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

// Status route
app.get('/status', (req, res) => {
    res.json({
        server: "running",
        uptime: "OK"
    });
});

// =======================
// Query Params Route
// =======================
app.get('/products', (req, res) => {
    const name = req.query.name;

    if (name) {
        res.json({ query: name });
    } else {
        res.send('Please provide a product name');
    }
});

// =======================
// Import Book Routes
// =======================
const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

// =======================
// 404 Handler
// =======================
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// =======================
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error"
    });
});

// =======================
// Start Server
// =======================
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});