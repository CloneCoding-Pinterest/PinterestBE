const { Router } = require('express');
const { s3Middleware, unloginUserGuard } = require('../../middlewares/_.middle.loader');

const pinRouter = Router();

const PinController = require('../controllers/pin.controller');
const pinController = new PinController();

//핀 등록
pinRouter.post('', unloginUserGuard, s3Middleware.single('picValue'), pinController.createPin);

//핀 전체 조회
pinRouter.get('', pinController.getPinLists);

//핀 상세 조회
pinRouter.get('/:pinId', pinController.getPin);

//핀 수정
pinRouter.put('/:pinId', unloginUserGuard, pinController.updatePin);

//핀 삭제
pinRouter.delete('/:pinId', unloginUserGuard, pinController.deletePin);

module.exports = pinRouter;
