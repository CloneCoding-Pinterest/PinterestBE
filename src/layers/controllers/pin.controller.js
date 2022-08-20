const e = require('express');
const PinService = require('../services/pin.service');

class PinController {
    pinService = new PinService();

    //핀 등록
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    createPin = async (req, res, next) => {
        const { title, content, picKey, picUrl } = req.body;
        const userId = 1;

        try {
            await this.pinService.createPin(userId, title, content, picKey, picUrl);

            res.status(200).json({
                isSuccess: true,
                message: '핀 등록에 성공했습니다.',
                result: {}
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: '핀 등록에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };
}

module.exports = PinController;
