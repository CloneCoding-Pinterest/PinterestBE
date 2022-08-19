const e = require('express');
const UserService = require('../services/user.service');
const BaseController = require('../controllers/base.controller');

const { CustomException } = require('../../models/_.models.loader');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class UserControlelr extends BaseController {
    #userService;

    constructor() {
        super();
        this.#userService = new UserService();
    }

    /** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
    join = (req, res, next) => {
        try {
            throw 1;
            return res.json('hello');
        } catch (err) {
            const except = this.exceptionHandler(err);
            return res.status(except.statusCode).json({
                isSuccess: false,
                message: except.message,
                result: {}
            });
        }
    };
}

module.exports = UserControlelr;
