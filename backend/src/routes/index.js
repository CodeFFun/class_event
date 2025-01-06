const express = require('express');
const userRouter = require('./user.js');
const authRouter = require('./Auth.js');
const reviewRouter = require('./review.js'); 
const ticketRouter = require('./ticket.js');
const eventRouter = require('./event.js'); 

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/review', reviewRouter)
router.use('/ticket', ticketRouter)
router.use('/event', eventRouter)

module.exports = router;