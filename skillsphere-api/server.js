const express = require('express');
const app = express();

// Import routes
const courseRoutes = require('./routes/courses');

const PORT = 4000;

// Middleware (for JSON parsing if needed later)
app.use(express.json());

// Challenge 1: Root Route
app.get('/', (req, res) => {
    res.send('Welcome to SkillSphere LMS API');
});

// Use course routes
app.use('/courses', courseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});