const express = require('express');
const userRouter = require('./User.js');
const authRouter = require('./Auth.js');

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router;