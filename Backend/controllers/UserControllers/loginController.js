// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken'); // Module for JSON Web Token generation and verification
const User = require('../../models/Users'); // Import User model for database operations
const ConnectMongo = require('../../db'); // Database connection function
const bcrypt = require('bcrypt'); // Module for password hashing
const joi = require('joi'); // Module for input validation
const fs = require('fs');
const path = require('path');


// Validation schema for login credentials using Joi
const loginValidator = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(8).max(30).required()
});

function handleLogs(message, level = "info") {
    const timestamp = new Date().toISOString();
    const logData = timestamp + ',' + level + ',' + ',' + message + '\n';
    const logFilePath = path.resolve(__dirname, '../../logs/loginLogs.csv');
   
    let file = fs.existsSync(logFilePath)
    if (file) {
        fs.appendFile(logFilePath, logData, (err) => {
            if (err) console.error(err);
        });
    }
    else {
        let heads = `timestamp,level,message`
        fs.writeFile(logFilePath, heads + '\n' + logData, (err) => {
            if (err) console.error(err);
        });
    }
}




// Function to handle errors and send appropriate responses
function handleErrors(res, type, error) {
    // console.error(`Error: "${type}" - ${error}`);
    handleLogs(error)
    // Switch case to handle different types of errors
    switch (type) {
        case "ValidationError":
            return res.status(400).json({ error: "ValidationError", message: error.details[0].message }); // Send validation error response
        case "NotMatched":
            return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" }); // Send authentication failed response
        default:
            return res.status(500).json({ error: "Internal server error", message: "Something went wrong" }); // Send generic internal server error response
    }
}

// Function to handle user login
module.exports.userLogin = async function (req, res) {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Validate user input using Joi schema
        const { error } = loginValidator.validate({ email, password });
        if (error) {
            return handleErrors(res, type = "ValidationError", error); // Handle validation errors
        }

        // Connect to the MongoDB database
        ConnectMongo()


        // Look for the user with the provided email in the database
        const user = await User.findOne({ email }).maxTimeMS(3000);
        if (!user) {
            return handleErrors(res, type = "NotMatched", "Email not found"); // Send user not found error
        }

        // Compare hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return handleErrors(res, type = "NotMatched", "Password not matched"); // Send password mismatch error
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: "1d", issuer: 'My Store' });
        return res.status(200).json({ token }); // Send JWT token as response
    } catch (error) {
        handleLogs(error)
        return handleErrors(res, type = "Unexpected", error.message || "Something went wrong"); // Catch unexpected errors
    }
};
