const { Router } = require('express');

const authRouter = Router();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

authRouter.post('/register', authController.registerAccount);
authRouter.get('/token', authController.publichAccessToken);
authRouter.get('/del-token', authController.deleteAllToken);

module.exports = authRouter;
