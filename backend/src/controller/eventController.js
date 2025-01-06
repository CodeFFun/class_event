const {event} = require('../lib/client.js');
const dataResponse = require('../lib/dataResponse.js');


class eventController{
    async getEventOfUser(req, res){
        const {userId} = req.body;
        if(!userId){
            res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.findMany({
                where:{
                    user_id: userId
                }
            })
            if(!tempEvent){
                res.json(dataResponse(null, "Events of this user doesn't exist", 404));
            }
            res.json(dataResponse(tempEvent, "Get Event of User", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }
    
    async getEventByType(req, res){
        const {type} = req.body;
        try {
            let tempEvent = await event.findMany({
                where:{
                    event_type: type
                }
            })
            if(!tempEvent){
                res.json(dataResponse(null, "Events of this type doesn't exist", 404));
            }
            res.json(dataResponse(tempEvent, "Get Event of User", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }

    async getEventById(req, res){
        const {eventId} = req.params;
        if(!eventId){
            res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.findUnique({
                where:{
                    event_id: eventId
                }
            })
            if(!tempEvent){
                res.json(dataResponse(null, "Event not found", 404));
            }
            res.json(dataResponse(tempEvent, "Get Event of User", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
        
    }

    async postEvent(req, res){
        let {event_name, event_type, event_description, event_date, event_time, event_location, user_id} = req.body;
        if(!event_name || !event_type || !event_description || !event_date || !event_time || !event_location || !user_id){
            res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.create({
                data:{
                    event_name: event_name,
                    event_type: event_type,
                    event_description: event_description,
                    event_date: event_date,
                    event_time: event_time,
                    event_location: event_location,
                    user_id: user_id
                }
            })
            res.json(dataResponse(tempEvent, "Create Event", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }

    async updateEvent(req, res){
        const {eventId} = req.params;
        if(!eventId){
            res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.update({
                where:{
                    event_id: eventId
                },
                data:req.body
            })
            res.json(dataResponse(null, "Update Event", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }

    async deleteEvent(req, res){
        const {eventId} = req.params;
        if(!eventId){
            res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
             await event.delete({
                where:{
                    event_id: eventId
                }
            })
            res.json(dataResponse(null, "Delete Event", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }
}

module.exports = eventController;