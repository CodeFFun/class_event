const userController = require('../controller/userController.js');

class authController {
    constructor() {
      this.newUser = null
    }
     async init(){
        this.newUser = new userController();
      }

    login = async (req, res) => {
      // do something
      if(!this.newUser){
        await this.init();
      }
      this.newUser.getUserByEmail(req, res);
    }
     register = async (req, res) => {
      // do something
      if(!this.newUser){
        await this.init();
      }
      this.newUser.createUser(req, res);
    }
  }
  
  module.exports = authController;