const PinRepository = require('../repositories/pin.repository');

class PinService {
    pinRepository = new PinRepository();

    //핀 등록
    createPin = async (title, content, tags) => {
        await this.pinRepository.createPin(title, content, tags);

        return result;
    };
}

module.exports = PinService;
