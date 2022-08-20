const e = require('express');
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
    registerAccount = (req, res, next) => {
        return res.json('hello');
    };

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    publichAccessToken = (req, res, next) => {
        return res.json('hello token');
    };
}

module.exports = AuthController;
