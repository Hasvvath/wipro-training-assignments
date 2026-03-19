function validateCourseId(req, res, next) {
    const id = req.params.id;

    // Check if numeric
    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid course ID"
        });
    }

    next(); // proceed if valid
}

module.exports = validateCourseId;