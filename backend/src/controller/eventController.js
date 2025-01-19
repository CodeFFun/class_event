const {event,user} = require('../lib/client.js');
const stringToEnum = require('../middleware/stringToEnum.js');
const dataResponse = require('../lib/dataResponse.js');
const fs = require('fs');
const path = require('path');



class eventController{
    async getEventOfUser(_, res){
        const {userId} = res.locals;
        if(!userId){
            return res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.findMany({
                where:{
                    user_id: userId
                }
            })
            if(!tempEvent){
                res.json(dataResponse(null, "Events of this user doesn't exist", 400));
            }
            res.json(dataResponse(tempEvent, "User event found", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }
    
    async getEventByType(req, res){
        const {type} = req.body;
        if(!type){
            return res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.findMany({
                where:{
                    event_type: type
                }
            })
            if(!tempEvent){
                returnres.json(dataResponse(null, "Events of this type doesn't exist", 404));
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
               return res.json(dataResponse(null, "Event not found", 404));
            }
            res.json(dataResponse(tempEvent, "Get Event of User", 200));
        } catch (error) {
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
        
    }

    async postEvent(req, res){
        let{userId} = res.locals;
        let {event_name, event_type, event_description, event_date, event_time, event_location,event_ticket, event_price} = req.body;
        let{file} = req
        let event_poster = file.filename
        event_type = stringToEnum(event_type);
        if(!event_name || !event_type || !event_description || !event_date || !event_time || !event_location  ||!userId || !event_poster || !event_ticket || !event_price){
            fs.unlink(path.join(__dirname, '../public', event_poster), (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            return res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.create({
                data:{
                    event_name: event_name,
                    event_type: [event_type],
                    event_description: event_description,
                    event_date: event_date,
                    event_time: event_time,
                    event_poster: event_poster,
                    event_location: event_location,
                    event_ticket: event_ticket,
                    event_price: event_price,
                    user:{
                        connect: {user_id: userId}
                    }
                }
            })
            res.json(dataResponse(tempEvent, "Event Created", 200));
        } catch (error) {
            console.log(error.message)
            fs.unlink(path.join(__dirname, '../public', event_poster), (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }

    async updateEvent(req, res){
        const {eventId} = req.params;
        let data = {...req.body}
        let{file} = req

        if(file){
            data = {...req.body, event_poster: file.filename}
        }

        if(!eventId){
            fs.unlink(path.join(__dirname, '../public', event_poster), (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            return res.json(dataResponse(null, "Not enough information", 400));
        }
        try {
            let tempEvent = await event.update({
                where:{
                    event_id: eventId
                },
                data:data
            })
            res.json(dataResponse(null, "Event updated", 200));
        } catch (error) {
            fs.unlink(path.join(__dirname, '../public', event_poster), (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            res.json(dataResponse(null, "Internal Server Error", 500));
        }
    }

    async deleteEvent(req, res){
        const {eventId} = req.params;
        if(!eventId){
            return res.json(dataResponse(null, "Not enough information", 400));
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