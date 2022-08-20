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

    /**
     * @param { string } token_type
     * @param { string } access_token
     * @param { string } expires_in
     * @param { string } refresh_token
     * @param { string } refresh_token_expires_in
     */
    registerAccount = (
        token_type,
        access_token,
        expires_in,
        refresh_token,
        refresh_token_expires_in
    ) => {};

    /**
     * @param { string } refreshToken
     */
    publichAccessToken = (refreshToken) => {};
}

module.exports = AuthService;
