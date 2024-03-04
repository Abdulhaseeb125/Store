const joi = require('joi');
const { handleErrors } = require('../OtherControllers/ErrorController');
const ConnectMongo = require('../../db');
const User = require('../../models/Users');
const mailer = require('nodemailer');
const bcrypt = require('bcrypt');

const DIGITS = '1234567890'
const EMAIL = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;

const transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: EMAIL, // generated ethereal user
        pass: password// generated ethereal password
    },

})

let emailValidator = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})


module.exports = async function ForgetPassword(req, res) {
    try {
        const { email } = req.body;
        let { error } = emailValidator.validate({ email })
        if (error) {
            console.log(error);
            handleErrors(res, "ValidationError", error, "../../logs/forgetLogs.csv");
        }

        ConnectMongo()
        const user = await User.findOne({ email })
        if (!user) {
            return handleErrors(res, "NotMatched", "User not found", "../../logs/forgetLogs.csv"); // Correct handling for non-existent user
        }

        let OTP = ''

        for (let i = 0; i < 6; i++) {
            OTP += DIGITS[Math.floor(Math.random() * 10)]
        }


        await transport.sendMail({
            from: EMAIL,
            to: email,
            subject: 'OTP code',
            text: OTP
        })


        const hashedOTP = await bcrypt.hash(OTP, 10); // Replace with secure hashing algorithm



        const time = Date.now() + 1000 * 60 * 30;
        await User.updateOne({ email: email }, { $set: { 'otp': hashedOTP, 'expires_at': time } });
        await user.save(); // This line may not be necessary since you're already updating the document

        res.status(200).json({
            "success": true,
            "OTP": OTP,
            expiresAt: time
        })

    } catch (e) {
        handleErrors(res, "Unexpected", e, "../../logs/forgetLogs.csv");
    }
}