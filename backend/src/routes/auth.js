const express = require('express');
const authController = require('../controller/authController.js');
const userController = require('../controller/userController.js');

const authRouter = express.Router();
const auth = new authController();
const user = new userController();

authRouter.post('/register', user.createUser)

authRouter.post('/login', auth.login)

module.exports = authRouter;
