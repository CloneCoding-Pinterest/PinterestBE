const { Router } = require('express');

const pinRouter = Router();

const PinController = require('../controllers/pin.controller');
const pinController = new PinController();

//핀 등록
pinRouter.post('', pinController.createPin);

module.exports = pinRouter;
