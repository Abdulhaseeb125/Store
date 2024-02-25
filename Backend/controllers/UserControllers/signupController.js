require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const ConnectMongo = require('../../db');
const bcrypt = require('bcrypt');
const joi = require('joi');

// Validation Schema
const signupValidator = joi.object({
    name: joi.string().regex(/^[A-Za-z ]+$/),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().min(8).max(30)
});

// Function to handle user signup
module.exports.signup = async function (req, res) { 
    try {
        const { name, email, password } = req.body;
        const { error } = signupValidator.validate({ name, email, password });

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        ConnectMongo();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

        const newUser = new User({
            name: name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, Name: newUser.name, email: newUser.email }, process.env.JWT_SECRET_KEY);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error in user signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
