const { Pin } = require('../../sequelize/models'); //모델 어떻게 찾아와,,,

class PinRepository {
    //핀 등록
    createPin = async (title, content, tags) => {
        await Pin.create({
            title,
            content,
            tags
        });

        return;
    };

    //pinId로 핀 상세조회
    findPin = async (pinId) => {
        const result = await Pin.findOne({
            where: { pinId }
        });

        return result;
    };
}

module.exports = PinRepository;
