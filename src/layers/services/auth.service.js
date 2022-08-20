const e = require('express');
const AuthRepository = require('../repositories/auth.repository');
const BaseController = require('../controllers/base.controller');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class AuthService {
    #authRepository;

    constructor() {
        this.#authRepository = new AuthRepository();
    }
}

module.exports = AuthService;
