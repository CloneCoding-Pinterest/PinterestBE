const e = require('express');
const PinService = require('../services/pin.service');

class PinController {
    pinService = new PinService();

    //핀 등록
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    createPin = async (req, res, next) => {
        const { title, content, picKey, picUrl } = req.body;
        const userId = 1; //토큰 구현 전이라 임의 값으로 설정

        try {
            const pin = await this.pinService.createPin(userId, title, content, picKey, picUrl);

            res.status(200).json({
                isSuccess: true,
                message: 'Pin 등록에 성공했습니다.',
                result: pin
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: 'Pin 등록에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };

    //핀 전체 조회
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getPinLists = async (req, res, next) => {
        try {
            const pinList = await this.pinService.getPinLists();

            res.status(200).json({
                isSuccess: true,
                message: 'Pin 조회에 성공했습니다.',
                result: { pinList }
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: 'Pin 조회에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };

    //핀 상세 조회
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getPin = async (req, res, next) => {
        const { pinId } = req.params;
        const userId = 1; //토큰 구현 전이라 임의 값으로 설정

        try {
            const pin = await this.pinService.getPin(pinId, userId);

            res.status(200).json({
                isSuccess: true,
                message: 'Pin 조회에 성공했습니다.',
                result: pin
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: 'Pin 조회에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };

    //핀 수정
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    updatePin = async (req, res, next) => {
        const { pinId } = req.params;
        const userId = 1; //토큰 구현 전이라 임의 값으로 설정
        const { title, content } = req.body;

        try {
            const pin = await this.pinService.updatePin(pinId, userId, title, content);

            res.status(200).json({
                isSuccess: true,
                message: 'Pin 수정에 성공했습니다.',
                result: pin
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: 'Pin 수정에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };

    //핀 삭제
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    deletePin = async (req, res, next) => {
        const { pinId } = req.params;
        const userId = 1; //토큰 구현 전이라 임의 값으로 설정

        try {
            await this.pinService.deletePin(pinId, userId);

            res.status(200).json({
                isSuccess: true,
                message: 'Pin 삭제에 성공했습니다.',
                result: {}
            });
        } catch (err) {
            // res.status(err.code).json({
            res.json({
                isSuccess: false,
                message: 'Pin 삭제에 실패했습니다.' + err.message,
                result: {}
            });
        }
    };
}

module.exports = PinController;
