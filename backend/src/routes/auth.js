const express = require('express');
const dataResponse = require('../lib/dataResponse.js');
const authController = require('../controller/authController.js');

const authRouter = express.Router();
const auth = new authController();

authRouter.post('/register', auth.register)

authRouter.post('/login', auth.login)
authRouter.get('/logout', auth.logout)
authRouter.get('/cookie', (req,res) => {
    let token = req.cookies.token;
    if(!token){
     res.json(dataResponse(null, "User is not authenticated", 403));
    }else{
        res.json(dataResponse(null, "User is authenticated", 200));
    }
})


module.exports = authRouter;
