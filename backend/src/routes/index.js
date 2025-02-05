const express = require('express');
const userRouter = require('./user.js');
const authRouter = require('./auth.js');
const reviewRouter = require('./review.js'); 
const ticketRouter = require('./ticket.js');
const eventRouter = require('./event.js'); 
const {verifyCookie} = require('../lib/cookie.js');

const router = express.Router();

router.use('/auth', authRouter)

router.use(verifyCookie);
router.use('/user', userRouter)
router.use('/review', reviewRouter)
router.use('/ticket', ticketRouter)
router.use('/event', eventRouter)

module.exports = router;