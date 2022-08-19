const UserService = require('../services/user.service');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class UserControlelr {
    #userService;

    constructor() {
        this.#userService = new UserService();
    }
}

module.exports = UserControlelr;
