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

    //핀 전체 조회
    findAllPins = async (page, count) => {
        const pinsResult = await UserPin.findAll({
            offset: count * (page - 1),
            limit: count,
            include: [
                {
                    model: Pin,
                    attributes: ['title', 'content', 'picUrl']
                }
            ]
        });

        return pinsResult.map((pin) => {
            return {
                pinId: pin.dataValues.pinId,
                author: pin.dataValues.userId, //User 테이블 구현 후 nickname 등으로 변경필요
                title: pin.dataValues.Pin.dataValues.title,
                content: pin.dataValues.Pin.dataValues.content,
                picUrl: pin.dataValues.Pin.dataValues.picUrl
            };
        });
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
        //Pin 테이블 수정
        await Pin.update({ title, content }, { where: { pinId } });

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

    //핀 삭제
    deletePin = async (pinId, userId) => {
        await UserPin.destroy({
            where: { pinId, userId }
        });

        await Pin.destroy({
            where: { pinId }
        });

        return;
    };
}

module.exports = PinRepository;
