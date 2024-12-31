const user = require('../controller/userController.js');

class authController {
  constructor() {
    this.newUser = new user();
  }
    async login(req, res) {
      // do something
      this.newUser.getUserByEmail(req, res);
    }
    async register(req, res) {
      // do something
      this.newUser.createUser(req, res);
    }
  }
  
  module.exports = authController;