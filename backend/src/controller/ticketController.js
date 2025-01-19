const dataResponse = require('../lib/dataResponse.js');
const {ticket} = require('../lib/client.js')

class ticketController{
    getAllTicket = async (req, res) => {
        const {eventId} = req.params;
        if(!eventId){
             return res.status(400).json(dataResponse(null, "No enough credientials", 400));
        }
        try {
            const tempTicket = await ticket.findMany({ where: {event_id: eventId}});
            if(!tempTicket){
                 res.status(404).json(dataResponse(null, "No ticket found", 404));
            }
             res.status(200).json(dataResponse(tempTicket, "Success", 200));
        } catch (error) {
            res.status(500).json(dataResponse(null, error.message, 500));
        }

    }

    createTicket = async (req, res) => {
        const {userId} = req.locals;
        const {ticketPrice, ticketQuantity} = req.body;
        if(!userId){
            return res.status(400).json(dataResponse(null, "No enough credientials", 400));
        }
        if(!ticketPrice || !ticketQuantity){
            return res.status(400).json(dataResponse(null, "All fields are required", 400));
        }
        try {
            await ticket.create({
                data: {
                    ticket_price: ticketPrice,
                    ticket_quantity: ticketQuantity,
                    user:{
                        connect:{
                            user_id: userId
                        }
                    }
                }
            })
             res.status(201).json(dataResponse(null, "Ticket created", 201));
        } catch (error) {
             res.status(500).json(dataResponse(null, error.message, 500));
        }

    }

    updateTicket = async (req, res) => {
        const {ticketId} = req.params;
        let data = req.body;
        if(!ticketId){
             res.status(400).json(dataResponse(null, "No enough credientials", 400));
        }
        try {
            await ticket.update({
                data: data,
                where: {
                    ticket_id: ticketId
                }
            })
             res.status(200).json(dataResponse(null, "Ticket updated", 200));
        } catch (error) {
             res.status(500).json(dataResponse(null, error.message, 500));
        }

    }

    deleteTicket = async (req, res) => {
        const {ticketId} = req.params;
        if(!ticketId){
             res.status(400).json(dataResponse(null, "No enough credientials", 400));
        }
        try {
            await ticket.delete({
                where: {
                    ticket_id: ticketId
                }
            })
             res.status(200).json(dataResponse(null, "Ticket deleted", 200));
        } catch (error) {
             res.status(500).json(dataResponse(null, error.message, 500));
        }

    }
}

module.exports = ticketController;