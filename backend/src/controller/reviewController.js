 const {review} = require('../lib/client.js');

class reviewController{
    async getAllReview(req, res){
        const { eventId } = req.params
        if(!eventId){
            res.json(dataResponse(null, null, 500));
        }
        try {
            let tempReview = await review.findMany({
                where: {
                    event_id: eventId
                }
            })
            if(!newUser){
                res.json(dataResponse(null, 'No review for this event exists', 404));
            }
            res.json(dataResponse(tempReview, null, 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async createReview(req, res){
        const {eventId} = req.params;
        const {userId, rating, comment} = req.body;
        if(!eventId){
            res.json(dataResponse(null, null, 403));
        }
        if(!userId || !rating || !comment){
            res.json(dataResponse(null, "All field are required", 403));
        }

        try {
             await review.create({
                data: {
                    user_id: userId,
                    event_id: eventId,
                    review_rating: rating,
                    review_content: comment
                },
                where: {
                    event_id: eventId
                }
            })
            res.json(dataResponse(null, "Comment added", 201));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }

    }

    async updateReview(req, res){
        const {reviewId} = req.params;
        if(!reviewId){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await review.update({
                data: req.body,
                where: {
                    review_id: reviewId
                }
            })
            res.json(dataResponse(null, "Comment updated", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

    async deleteReview(req, res){
        const {reviewId} = req.params;
        if(!reviewId){
            res.json(dataResponse(null, null, 403));
        }
        try {
            await review.delete({
                where: {
                    review_id: reviewId
                }
            })
            res.json(dataResponse(null, "Comment deleted", 200));
        } catch (error) {
            res.json(dataResponse(null, "Something went wrong", 500));
        }
    }

}


module.exports = reviewController;