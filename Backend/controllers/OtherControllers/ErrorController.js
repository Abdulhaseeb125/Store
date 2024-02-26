let handleLogs = require('./LogController')

module.exports.handleErrors = function (res, type, error, logsPath, payload ) {
    // Log the error
    handleLogs(logsPath, error, payload);
    // Switch case to handle different types of errors
    switch (type) {
        case "ValidationError":
            return res.status(400).json({ error: "ValidationError", message: error.details[0].message }); // Send validation error response
        case "NotMatched":
            return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" }); // Send authentication failed response
        case "Duplicate":
            return res.status(409).json({ error: 'Email already in use' }); // Send duplicate email error response
        default:
            return res.status(500).json({ error: "Internal server error", message: "Something went wrong" }); // Send generic internal server error response
    }
}