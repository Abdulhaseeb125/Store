let express = require('express');
const { userLogin } = require('../controllers/UserControllers/loginController');
const { signup } = require('../controllers/UserControllers/signupController');

let userRouter = express.Router()

userRouter.post('/login', userLogin);
userRouter.post('/signup', signup);

module.exports = userRouter;
