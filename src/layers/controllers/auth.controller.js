const e = require('express');
const joi = require('joi');

const AuthService = require('../services/auth.service');
const BaseController = require('../controllers/base.controller');

const { FormProvider } = require('../../modules/_.module.loader');
const { CustomException } = require('../../models/_.models.loader');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class AuthController extends BaseController {
    #authService;
    #formProvider;

    constructor() {
        super();
        this.#authService = new AuthService();
        this.#formProvider = new FormProvider();
    }

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    registerAccount = async (req, res, next) => {
        try {
            /** @type { { accessToken: string, refreshToken: string } } */
            const kakaoDto = await joi
                .object({
                    accessToken: joi.string().required(),
                    refreshToken: joi.string().required()
                })
                .validateAsync({ ...req.body });

            const result = await this.#authService.registerAccount(kakaoDto);

            return res
                .status(200)
                .json(
                    this.#formProvider.getSuccessFormDto('카카오 로그인에 성공하였습니다.', result)
                );
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    publichAccessToken = async (req, res, next) => {
        try {
            const refreshToken = await joi
                .string()
                .required()
                .validateAsync(req?.query?.refreshToken);

            const token = await this.#authService.publichAccessToken(refreshToken);
            return res
                .status(200)
                .json(this.#formProvider.getFailureFormDto('재 로그인에 성공하셨습니다.', token));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    deleteAllToken = async (req, res, next) => {
        try {
            const { refreshToken } = await joi
                .object({
                    refreshToken: joi.string().required()
                })
                .validateAsync({
                    refreshToken: req?.query?.refreshToken
                });

            await this.#authService.deleteAllToken(refreshToken);

            return res
                .status(200)
                .json(this.#formProvider.getFailureFormDto('로그아웃에 성공하셨습니다.'));
        } catch (err) {
            const exception = this.exceptionHandler(err);
            return res
                .status(exception.statusCode)
                .json(this.#formProvider.getFailureFormDto(exception.message));
        }
    };
}

module.exports = AuthController;
