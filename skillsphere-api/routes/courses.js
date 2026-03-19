const express = require('express');
const router = express.Router();

// Import middleware
const validateCourseId = require('../middleware/validateCourseId');

// Challenge 2 + 3: Dynamic route with middleware
router.get('/:id', validateCourseId, (req, res) => {
    const courseId = req.params.id;

    res.json({
        id: courseId,
        name: "React Mastery",
        duration: "6 weeks"
    });
});

module.exports = router;