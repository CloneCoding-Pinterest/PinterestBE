const PinRepository = require('../repositories/pin.repository');

class PinService {
    pinRepository = new PinRepository();

    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl) => {
        await this.pinRepository.createPin(userId, title, content, picKey, picUrl);

        return;
    };
}

module.exports = PinService;
