const { User, Pin, UserPin } = require('../../sequelize/models');

class PinRepository {
    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl) => {
        //Pin 테이블 등록
        const pinResult = await Pin.create({
            title,
            content,
            picKey,
            picUrl
        });

        //UserPin 테이블 등록
        const userPinResult = await UserPin.create({
            userId,
            pinId: pinResult.dataValues.pinId
        });

        // //User 테이블에서 userId로 nickname 등 조회
        // const userResult = await User.findOne({
        //     where: { userId },
        //     attributes: ['nickname'],
        // })

        const result = {
            pin: {
                pinId: pinResult.dataValues.pinId,
                author: userId, //User 테이블 구현 후 nickname 등으로 변경필요
                title: pinResult.dataValues.title,
                content: pinResult.dataValues.content,
                picUrl: pinResult.dataValues.picUrl
            }
        };

        return result;
    };

    //핀 상세 조회
    findPin = async (pinId, userId) => {
        //Pin 테이블 조회
        const pinResult = await Pin.findOne({
            where: { pinId }
        });

        // //User 테이블에서 userId로 nickname 등 조회
        // const userResult = await User.findOne({
        //     where: { userId },
        //     attributes: ['nickname'],
        // })

        const result = {
            pin: {
                pinId: pinResult.dataValues.pinId,
                author: userId, //User 테이블 구현 후 nickname 등으로 변경필요
                title: pinResult.dataValues.title,
                content: pinResult.dataValues.content,
                picUrl: pinResult.dataValues.picUrl
            }
        };

        return result;
    };

    //핀 수정
    updatePin = async (pinId, userId, title, content) => {
        await Pin.update({ title, content }, { where: { pinId } });

        //Pin 테이블 조회
        const pinResult = await Pin.findOne({
            where: { pinId }
        });

        console.log(pinResult);
        return;
    };
}

module.exports = PinRepository;
