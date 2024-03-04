const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String, unique: true, required: true,
    },
    password: {
        type: String, minlength: 8, required: true
    },
    role: {
        type: String, default: "user"
    },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    otp: { type: String },
    expires_at: { type: Date}
});

const User = mongoose.model('users', userSchema);
module.exports = User;

