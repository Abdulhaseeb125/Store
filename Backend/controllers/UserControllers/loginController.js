// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken'); // Module for JSON Web Token generation and verification
const User = require('../../models/Users'); // Import User model for database operations
const ConnectMongo = require('../../db'); // Database connection function
const bcrypt = require('bcrypt'); // Module for password hashing
const joi = require('joi'); // Module for input validation
const { handleErrors } = require('../OtherControllers/ErrorController');


// Validation schema for login credentials using Joi
const loginValidator = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(8).max(30).required()
});


// Function to handle errors and send appropriate responses


// Function to handle user login
module.exports.userLogin = async function (req, res) {
    const logsPath = '../../logs/loginLogs.csv'
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;
        const payload = { email, password, type:'login' }
        // Validate user input using Joi schema
        const { error } = loginValidator.validate({ email, password });
        if (error) {
            return handleErrors(res, type = "ValidationError", error, logsPath, payload); // Handle validation errors
        }

        // Connect to the MongoDB database
        ConnectMongo()


        // Look for the user with the provided email in the database
        const user = await User.findOne({ email }).maxTimeMS(3000);
        if (!user) {
            return handleErrors(res, type = "NotMatched", "Email not found", logsPath, payload); // Send user not found error
        }

        // Compare hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return handleErrors(res, type = "NotMatched", "Password not matched", logsPath, payload); // Send password mismatch error
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: "1d", issuer: 'My Store' });
        return res.status(200).json({ token }); // Send JWT token as response
    } catch (error) {
        return handleErrors(res, type = "Unexpected", error || "Something went wrong", logsPath, null); // Catch unexpected errors
    }
};
