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

    /**
     * pinId, title, content, picUrl, picSize, picKey 로 이루어진 객체 에서 `picKey` 를 `제거`
     *
     * @param { { pinId: number, title: string, content: string, picKey: string, picUrl: string, picSize: 'Small' | 'Medium' | 'Large' } } iPin
     * @returns
     */
    #extractPicKeyFromPin = ({ picKey, ...others }) => {
        return others;
    };

    /**
     * pinId, title, content, picUrl, picSize 로 이루어진 객체와 `author` 문자열을 `결합`하여 반환합니다.
     *
     * @param { { pinId: number, title: string, content: string, picUrl: string, picSize: 'Small' | 'Medium' | 'Large' } } iPin
     * @param { string } author
     * @returns { { pinId: number, title: string, content: string, picUrl: string, picSize: 'Small' | 'Medium' | 'Large', author: string } }
     */
    #appendAuthorIntoPin = (iPin, author) => {
        return { ...iPin, author };
    };

    createPinByValues = async (userId, title, content, picKey, picUrl, picSize) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const createdPin = await this.#pinRepository.createPinByValues(
            title,
            content,
            picKey,
            picUrl,
            picSize
        );
        await this.#pinRepository.createUserPinByPinIdAndUserId(userId, createdPin.pinId);

        // 구조분해할당과 나머지 연산자를 이용한 객체의 요소 제거 입니다...
        const pinWithoutPicKey = this.#extractPicKeyFromPin(createdPin);
        const pinWithAuthor = this.#appendAuthorIntoPin(pinWithoutPicKey, user.nickname);

        return pinWithAuthor;
    };

    /**
     * @deprecated
     */
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
