const UserRepository = require('../repositories/user.repository');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class UserService {
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }
}

module.exports = UserService;
