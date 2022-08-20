const PinRepository = require('../repositories/pin.repository');

class PinService {
    pinRepository = new PinRepository();

    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl) => {
        const result = await this.pinRepository.createPin(userId, title, content, picKey, picUrl);

        return result;
    };

    //핀 상세 조회
    getPin = async (pinId, userId) => {
        const result = await this.pinRepository.findPin(pinId, userId);

        return result;
    };

    //핀 수정
    updatePin = async (pinId, userId, title, content) => {
        const result = await this.pinRepository.updatePin(pinId, userId, title, content);

        return result;
    };
}

module.exports = PinService;
