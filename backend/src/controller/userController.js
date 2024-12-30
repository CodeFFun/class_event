const dataResponse = require('../lib/dataResponse.js');
const {hashPassword} = require('../middleware/hashPassword.js');

class userController{
     createUser = async (req, res) => {
        let {name,email, password, contact} = req.body;
        if(!name || !email || !password || !contact ){
            res.json(dataResponse(null, 'All fields are required', 400));
        }
        try{
            //hash the password and save the user to the database
            password = await hashPassword(password)
            
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    getUserById = (req, res) => {
        const {id} = req.params;
        if(!id){
            res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //get the user from the database
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    updateUser = (req, res) => {
        const {id} = req.params;
        if(!id){
            res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //update the user in the database
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    deleteUser = (req, res) => {
        const {id} = req.params;
        if(!id){
            res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //delete the user from the database
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }
}

module.exports = userController;