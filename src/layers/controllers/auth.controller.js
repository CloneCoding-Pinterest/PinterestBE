const e = require('express');
const joi = require('joi');

const AuthService = require('../services/auth.service');
const BaseController = require('../controllers/base.controller');

const { CustomException } = require('../../models/_.models.loader');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class AuthController extends BaseController {
    #authService;

    constructor() {
        super();
        this.#authService = new AuthService();
    }

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    registerAccount = async (req, res, next) => {
        try {
            const kakaoDto = await joi
                .object({
                    token_type: joi.string().required(),
                    access_token: joi.string().required(),
                    expires_in: joi.string().required(),
                    refresh_token: joi.string().required(),
                    refresh_token_expires_in: joi.string().required()
                })
                .validateAsync({ ...req.body });

            return res.status(200).json({
                isSuccess: true,
                message: '카카오 로그인에 성공하셨습니다.',
                result: { kakaoDto }
            });
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res.status(exception.statusCode).json({
                isSuccess: false,
                message: exception.message,
                result: {}
            });
        }
    };

    getPin = (req, req, next) => {
        const { page, count, tag, target } = req.query;

        return res.json(req.query);
    };

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    publichAccessToken = async (req, res, next) => {
        try {
            const refreshToken = await joi
                .string()
                .required()
                .validateAsync(req?.query?.refreshToken);

            return res.status(200).json({
                isSuccess: true,
                message: '재 로그인에 성공하셨습니다.',
                result: { refreshToken }
            });
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res.status(exception.statusCode).json({
                isSuccess: false,
                message: exception.message,
                result: {}
            });
        }
    };
}

module.exports = AuthController;