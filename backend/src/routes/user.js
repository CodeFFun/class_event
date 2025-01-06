const express = require('express');
const userController = require('../controller/userController.js');

const userRouter = express.Router();
const user = new userController();

userRouter.get('/', (_, res) => {
    res.send('User');
})

userRouter.get('/:id', user.getUserById);


userRouter.post('/create', (_, res) => {
    res.send('User');
})

userRouter.patch('/:id', user.updateUser);

userRouter.delete('/:id', user.deleteUser);

module.exports = userRouter;