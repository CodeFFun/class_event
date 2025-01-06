const express = require('express');
const eventController = require('../controller/eventController.js')

const eventRouter = express.Router();

const event = new eventController();

eventRouter.get('/user', event.getEventOfUser);
eventRouter.get('/type', event.getEventByType);
eventRouter.get('/:eventId', event.getEventById);
eventRouter.post('/', event.postEvent);
eventRouter.patch('/:eventId', event.updateEvent);
eventRouter.delete('/:eventId', event.deleteEvent);

module.exports = eventRouter;