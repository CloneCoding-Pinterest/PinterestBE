const PinRepository = require('../repositories/pin.repository');
const UserRepository = require('../repositories/user.repository');

const {
    NotFoundException,
    BadRequestException
} = require('../../models/exception/custom.exception');

class PinService {
    #pinRepository;
    #userRepository;

    constructor() {
        this.#pinRepository = new PinRepository();
        this.#userRepository = new UserRepository();
    }

    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl, picSize) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        if (title === undefined || content === undefined || picSize === undefined)
            throw new BadRequestException('입력값 확인');

        console.log(title, content, picSize);

        const result = await this.#pinRepository.createPin(
            userId,
            title,
            content,
            picKey,
            picUrl,
            picSize
        );

        return result;
    };

    //핀 전체 조회
    getPinLists = async (page, count) => {
        const result = await this.#pinRepository.findAllPins(page, count);

        return result;
    };

    //핀 상세 조회
    getPin = async (pinId) => {
        const result = await this.#pinRepository.findPin(pinId);

        return result;
    };

    //핀 수정
    updatePin = async (pinId, userId, title, content) => {
        await this.#pinRepository;

        const result = await this.#pinRepository.updatePin(pinId, userId, title, content);

        return result;
    };

    //핀 삭제
    deletePin = async (pinId, userId) => {
        await this.#pinRepository.deletePin(pinId, userId);

        return;
    };
}

module.exports = PinService;
