const express = require('express');

const ticketController = require('../controller/ticketController.js')

const ticketRouter = express.Router();

const ticket = new ticketController();

//pass eventId as id
ticketRouter.get('/:id',ticket.getAllTicket)

//pass eventId as id 
ticketRouter.post('/:id', ticket.createTicket)

//pass reviewId as id
ticketRouter.patch('/:id', ticket.updateTicket)

//pass reviewId as id
ticketRouter.delete('/:id', ticket.deleteTicket)

module.exports = ticketRouter;
