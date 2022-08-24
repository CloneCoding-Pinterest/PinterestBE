const { User, UserDetail, Pin, UserPin } = require('../../sequelize/models');

class PinRepository {
    isExistsUserPinByUserIdAndPinId = async (userId, pinId) => {
        const userPin = await UserPin.findOne({
            where: { userId, pinId },
            raw: true
        });

        if (userPin === null) return false;
        else return true;
    };

    findPicUrlByPinId = async (pinId) => {
        const findedPin = await Pin.findOne({
            where: { pinId },
            raw: true,
            attributes: ['picUrl']
        });

        return findedPin.picUrl;
    };

    /**
     * @param { string } title
     * @param { string } content
     * @param { string } picKey
     * @param { string } picUrl
     * @param { 'Small' | 'Medium' | 'Large' } picSize
     * @returns { Promise<{ pinId: number, title: string, content: string, picKey: string, picUrl: string, picSize: 'Small' | 'Medium' | 'Large' }> }
     */
    createPinByValues = async (title, content, picKey, picUrl, picSize) => {
        const createdPinResult = await Pin.create({
            title,
            content,
            picKey,
            picUrl,
            picSize
        });

        /** @type { { pinId: number, title: string, content: string, picKey: string, picUrl: string, picSize: 'Small' | 'Medium' | 'Large' } } */
        const createdPin = createdPinResult?.dataValues;
        return createdPin;
    };

    /**
     * @param { number } userId
     * @param { number } pinId
     */
    createUserPinByPinIdAndUserId = async (userId, pinId) => {
        const createdUserPinResult = await UserPin.create({ userId, pinId });

        console.log(createdUserPinResult);
    };

    //핀 등록
    createPin = async (userId, title, content, picKey, picUrl, picSize) => {
        //Pin 테이블 등록
        const pinResult = await Pin.create({
            title,
            content,
            picKey,
            picUrl,
            picSize
        });

        //UserPin 테이블 등록
        const userPinResult = await UserPin.create({
            userId,
            pinId: pinResult.dataValues.pinId
        });

        //User 테이블에서 detailId 가져오기
        const user = await User.findOne({
            attributes: ['detailId'],
            where: { userId },
            raw: true
        });

        const detailId = user.detailId;

        //UserDetail 테이블에서 nickname 가져오기
        const username = await UserDetail.findOne({
            attributes: ['nickname'],
            where: { detailId }
        });

        const result = {
            pin: {
                pinId: pinResult.dataValues.pinId,
                author: username.dataValues.nickname,
                title: pinResult.dataValues.title,
                content: pinResult.dataValues.content,
                picUrl: pinResult.dataValues.picUrl,
                picSize: pinResult.dataValues.picSize
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
                    attributes: ['title', 'content', 'picUrl', 'picSize']
                },
                {
                    model: User,
                    attributes: ['userId', 'detailId'],
                    include: [
                        {
                            model: UserDetail,
                            attributes: ['detailId', 'nickname']
                        }
                    ]
                }
            ]
        });

        return pinsResult.map((pin) => {
            return {
                pinId: pin.dataValues.pinId,
                author: pin.dataValues.User.dataValues.UserDetail.dataValues.nickname,
                title: pin.dataValues.Pin.dataValues.title,
                content: pin.dataValues.Pin.dataValues.content,
                picUrl: pin.dataValues.Pin.dataValues.picUrl,
                picSize: pin.dataValues.Pin.dataValues.picSize
            };
        });
    };

    //핀 상세 조회
    findPin = async (pinId) => {
        //UserPin 테이블 조회
        const pinResult = await UserPin.findOne({
            where: { pinId },
            raw: true,
            include: [
                {
                    model: Pin,
                    attributes: ['title', 'content', 'picUrl', 'picSize'],
                    raw: true
                },
                {
                    model: User,
                    attributes: ['userId', 'detailId'],
                    raw: true,
                    include: [
                        {
                            model: UserDetail,
                            attributes: ['detailId', ['nickname', 'author']],
                            raw: true
                        }
                    ]
                }
            ]
        });

        const result = {
            pin: {
                pinId: pinResult['pinId'],
                author: pinResult['User.UserDetail.author'],
                title: pinResult['Pin.title'],
                content: pinResult['Pin.content'],
                picUrl: pinResult['Pin.picUrl'],
                picSize: pinResult['Pin.picSize']
            }
        };

        return result;
    };

    /**
     * true일 때 수정 성공, false일 때는 수정 사항이 없어서 수정하지 않았음.
     * null일 경우 알 수 없는 이유로 2개 이상 수정성공한 것으로 실패로 처리.
     * @param { number } pinId
     * @param { number } userId
     * @param { string } title
     * @param { string } content
     * @returns
     */
    updatePinByValues = async (pinId, userId, title, content) => {
        const updatedPin = await Pin.update({ title, content }, { where: { pinId } });

        if (updatedPin[0] > 1) return null;
        else if (updatedPin[0] === 1) return true;
        else return false;
    };

    /**
     * @deprecated
     */
    updatePin = async (pinId, userId, title, content) => {
        //Pin 테이블 수정
        await Pin.update({ title, content }, { where: { pinId } });

        //UserPin 테이블 조회
        const pinResult = await UserPin.findOne({
            where: { pinId },
            raw: true,
            include: [
                {
                    model: Pin,
                    attributes: ['title', 'content', 'picUrl', 'picSize'],
                    raw: true
                },
                {
                    model: User,
                    attributes: ['userId', 'detailId'],
                    raw: true,
                    include: [
                        {
                            model: UserDetail,
                            attributes: ['detailId', ['nickname', 'author']],
                            raw: true
                        }
                    ]
                }
            ]
        });

        const result = {
            pin: {
                pinId: pinResult['pinId'],
                author: pinResult['User.UserDetail.author'],
                title: pinResult['Pin.title'],
                content: pinResult['Pin.content'],
                picUrl: pinResult['Pin.picUrl'],
                picSize: pinResult['Pin.picSize']
            }
        };

        return result;
    };

    //핀 삭제
    deletePin = async (pinId, userId) => {
        await Pin.destroy({
            where: { pinId }
        });

        return;
    };
}

module.exports = PinRepository;
