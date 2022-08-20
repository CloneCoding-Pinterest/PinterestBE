const { User, Pin, UserPin } = require('../../sequelize/models');

class PinRepository {
    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl) => {
        const pin = await Pin.create({
            title,
            content,
            picKey,
            picUrl
        });

        console.log(userId);
        console.log(pin.dataValues.pinId);

        const userPin = await UserPin.create({
            userId,
            pinId: pin.dataValues.pinId
        });

        console.log(pin, userPin);
        return { pin, userPin };
    };
}

module.exports = PinRepository;
