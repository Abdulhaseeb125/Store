// Required modules
require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken'); // JSON Web Token handling
const User = require('../../models/Users'); // User model
const ConnectMongo = require('../../db'); // MongoDB connection function
const bcrypt = require('bcrypt'); // Password hashing
const joi = require('joi'); // Data validation
const { handleErrors } = require('../OtherControllers/ErrorController');


// Validation Schema using Joi
const signupValidator = joi.object({
    name: joi.string().regex(/^[A-Za-z ]+$/), // Only alphabets and spaces allowed
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), // Valid email format with specific TLDs
    password: joi.string().min(8).max(30).regex(/^[A-Z](?=.*)|[!@#$%^&*](?=.*).*$/) // At least one upper case letter and one symbol // Password length between 8 and 30 characters
});

// Function to handle user signup
module.exports.signup = async function (req, res) {
    const logsPath = '../../logs/signUpLogs.csv'
    try {
        const { name, email, password } = req.body; // Extract user data from request body
        const payload = { name, email, password, type:'signup' }
        const { error } = signupValidator.validate({ name, email, password }); // Validate user input

        if (error) {
            return handleErrors(res, type = "ValidationError", error, logsPath, payload); // Handle validation error
        }

        ConnectMongo(); // Connect to MongoDB

        const existingUser = await User.findOne({ email }); // Check if user already exists

        if (existingUser) {
            return handleErrors(res, type = "Duplicate", "Email already in use", logsPath, payload); // Handle duplicate email error
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)); // Hash the password

        const newUser = new User({
            name: name,
            email,
            password: hashedPassword
        }); // Create a new user instance

        await newUser.save(); // Save the new user to the database
        // Create JWT token for the new user
        const token = jwt.sign({ userId: newUser._id, Name: newUser.name, email: newUser.email }, process.env.JWT_SECRET_KEY);
        res.status(201).json({ token }); // Send token as response
    } catch (error) {
        handleErrors(res, "Unexpected", error, logsPath); // Handle unexpected errors
    }
};
