let express = require('express');
const { userLogin } = require('../controllers/UserControllers/loginController');
const { signup } = require('../controllers/UserControllers/signupController');
const forgetPassword = require('../controllers/UserControllers/forgetPassword');

let userRouter = express.Router()

userRouter.post('/login', userLogin);
userRouter.post('/signup', signup);
userRouter.post('/forget', forgetPassword);

module.exports = userRouter;
