const express = require('express');
const upload = require('../lib/image.js');
const imageUpload = require('../middleware/imageUpload.js');
const eventController = require('../controller/eventController.js')
const checkRole = require('../middleware/checkRole.js');

const eventRouter = express.Router();

const event = new eventController();

//for everyone
eventRouter.post('/type', event.getEventByType);
eventRouter.get('/:eventId', event.getEventById);

//for only organization and admin
eventRouter.use(checkRole);
eventRouter.get('/user', event.getEventOfUser);
eventRouter.post('/', upload.single('image'),imageUpload,event.postEvent);
eventRouter.patch('/:eventId',upload.single('image'),imageUpload, event.updateEvent);
eventRouter.delete('/:eventId', event.deleteEvent);

module.exports = eventRouter;