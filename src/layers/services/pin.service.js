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
        const pins = await this.#pinRepository.findAllPins(page, count);
        if (pins === null) throw new Error('알 수 없는 이유로 Pin 조회에 실패했습니다.');

        return pins.map((pin) => {
            return {
                pinId: pin['pinId'],
                author: pin['User.UserDetail.nickname'],
                title: pin['Pin.title'],
                content: pin['Pin.content'],
                picUrl: pin['Pin.picUrl'],
                picSize: pin['Pin.picSize']
            };
        });
    };

    //핀 상세 조회
    getPin = async (pinId) => {
        const pin = await this.#pinRepository.findPinByPinId(pinId);
        if (!pin) throw new NotFoundException('존재 하지 않는 pin입니다.');

        const userId = await this.#pinRepository.findUserIdByPinId(pinId);

        const user = await this.#userRepository.findUserDetailByUserId(userId);

        // 구조분해할당과 나머지 연산자를 이용한 객체의 요소 제거 입니다...
        const pinWithoutPicKey = this.#extractPicKeyFromPin(pin);
        const pinWithAuthor = this.#appendAuthorIntoPin(pinWithoutPicKey, user.nickname);

        return pinWithAuthor;
    };

    updatePinByValues = async (pinId, userId, title, content) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const isExistsUserPin = await this.#pinRepository.isExistsUserPinByUserIdAndPinId(
            userId,
            pinId
        );
        if (!isExistsUserPin) throw new Error('해당 유저가 작성한 pin이 없습니다.');

        const isUpdatedPin = await this.#pinRepository.updatePinByValues(
            pinId,
            userId,
            title,
            content
        );
        if (isUpdatedPin === null) throw new Error('알 수 없는 이유로 Pin 수정에 실패했습니다.');

        const picUrl = await this.#pinRepository.findPicUrlByPinId(pinId);

        return {
            pinId,
            author: user.nickname,
            title,
            content,
            picUrl
        };
    };

    /**
     * @deprecated
     */
    updatePin = async (pinId, userId, title, content) => {
        await this.#pinRepository;

        const result = await this.#pinRepository.updatePin(pinId, userId, title, content);

        return result;
    };

    deletePinByValues = async (pinId, userId) => {
        const user = await this.#userRepository.findUserDetailByUserId(userId);
        if (!user) throw new NotFoundException('존재 하지 않는 유저입니다.');

        const isExistsUserPin = await this.#pinRepository.isExistsUserPinByUserIdAndPinId(
            userId,
            pinId
        );
        if (!isExistsUserPin) throw new Error('해당 유저가 작성한 pin이 없습니다.');

        const isDeletedPin = await this.#pinRepository.deletePinByValues(pinId);

        return isDeletedPin;
    };
    /**
     * @deprecated
     */
    deletePin = async (pinId, userId) => {
        await this.#pinRepository.deletePin(pinId, userId);

        return;
    };
}

module.exports = PinService;
