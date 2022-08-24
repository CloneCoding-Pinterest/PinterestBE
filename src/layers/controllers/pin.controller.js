const e = require('express');
const joi = require('joi');
const PinService = require('../services/pin.service');
const { FormProvider } = require('../../modules/_.module.loader');
const BaseController = require('./base.controller');

class PinController extends BaseController {
    #pinService;
    #formProvider;

    constructor() {
        super();
        this.#pinService = new PinService();
        this.#formProvider = new FormProvider();
    }

    //핀 등록
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    createPin = async (req, res, next) => {
        const { title, content, picSize } = req.query;
        const userId = res.locals.userId;

        try {
            const picUrl = req?.file?.location;
            const picKey = req?.file?.key;

            await joi
                .object({
                    userId: joi.number().required(),
                    title: joi.string().trim().required(),
                    content: joi.string().trim().required(),
                    picSize: joi.string().valid('Small', 'Medium', 'Large').required(),
                    picUrl: joi.string().trim().required(),
                    picKey: joi.string().trim().required()
                })
                .validateAsync({
                    title,
                    content,
                    picSize,
                    userId,
                    picUrl,
                    picKey
                });

            const pin = await this.#pinService.createPinByValues(
                userId,
                title,
                content,
                picKey,
                picUrl,
                picSize
            );

            // const pin = await this.#pinService.createPin(
            //     userId,
            //     title,
            //     content,
            //     picKey,
            //     picUrl,
            //     picSize
            // );

            return res
                .status(200)
                .json(this.#formProvider.getSuccessFormDto('Pin 등록에 성공했습니다.', pin));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    //핀 전체 조회
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getPinLists = async (req, res, next) => {
        try {
            const page = Number(req.query.page || 1); //값이 없다면 기본값 1페이지
            const count = Number(req.query.count || 18); //값이 없다면 기본값 핀 18개

            const pinList = await this.#pinService.getPinLists(page, count);

            return res
                .status(200)
                .json(
                    this.#formProvider.getSuccessFormDto('Pin 조회에 성공했습니다.', { pinList })
                );
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    //핀 상세 조회
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    getPin = async (req, res, next) => {
        const { pinId } = req.params;

        try {
            const pin = await this.#pinService.getPin(pinId);

            return res
                .status(200)
                .json(this.#formProvider.getSuccessFormDto('Pin 조회에 성공했습니다.', pin));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    //핀 수정
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    updatePin = async (req, res, next) => {
        const { pinId } = req.params;
        const userId = res.locals.userId;
        const { title, content } = req.body;

        try {
            await joi
                .object({
                    userId: joi.number().required(),
                    pinId: joi.number().required(),
                    title: joi.string().trim().required(),
                    content: joi.string().trim().required()
                })
                .validateAsync({
                    userId,
                    pinId,
                    title,
                    content
                });

            const pin = await this.#pinService.updatePinByValues(pinId, userId, title, content);

            return res
                .status(200)
                .json(this.#formProvider.getSuccessFormDto('Pin 수정에 성공했습니다.', { pin }));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    //핀 삭제
    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    deletePin = async (req, res, next) => {
        const { pinId } = req.params;
        const userId = res.locals.userId;
        //토큰 구현 전이라 임의 값으로 설정

        try {
            await this.#pinService.deletePin(pinId, userId);

            return res
                .status(200)
                .json(this.#formProvider.getSuccessFormDto('Pin 삭제에 성공했습니다.'));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };
}

module.exports = PinController;
