const { Router } = require('express');

const globalRouter = Router();
const UserController = require('../controllers/user.controller');
const userController = new UserController();

globalRouter.post('/join', userController.join);

module.exports = globalRouter;
