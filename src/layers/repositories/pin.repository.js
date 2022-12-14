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

    findUserIdByPinId = async (pinId) => {
        const userPin = await UserPin.findOne({
            where: { pinId },
            attributes: ['userId'],
            raw: true
        });

        return userPin.userId;
    };

    /**
     *
     * @param {number} pinId
     * @returns { Promise<{pinId:number, title:string, content:string, picKey:string, picUrl:string, picSize:'Small'|'Medium'|'Large'} | null> }
     */
    findPinByPinId = async (pinId) => {
        const findpin = await Pin.findOne({
            where: { pinId },
            raw: true
        });
        return findpin;
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
     * @param { 'small' | 'medium' | 'large' } picSize
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

        /** @type { { pinId: number, title: string, content: string, picKey: string, picUrl: string, picSize: 'small' | 'medium' | 'large' } } */
        const createdPin = createdPinResult?.dataValues;
        return createdPin;
    };

    /**
     * @param { number } userId
     * @param { number } pinId
     */
    createUserPinByPinIdAndUserId = async (userId, pinId) => {
        const createdUserPinResult = await UserPin.create({ userId, pinId });

        return createdUserPinResult;
    };

    /**
     * UserPin??? ????????? Pin model?????? title, content, picUrl, picSize??? ????????????
     * UserPin??? ????????? User model?????? ?????? ????????? UserDetail model??? nickname??? ????????????
     * @param { number } page
     * @param { number } count
     * @returns
     */
    findAllPins = async (page, count) => {
        const pins = await UserPin.findAll({
            offset: count * (page - 1),
            limit: count,
            raw: true,
            include: [
                {
                    model: Pin,
                    raw: true,
                    attributes: ['title', 'content', 'picUrl', 'picSize']
                },
                {
                    model: User,
                    raw: true,
                    attributes: ['detailId'],
                    include: [
                        {
                            model: UserDetail,
                            raw: true,
                            attributes: ['nickname']
                        }
                    ]
                }
            ]
        });

        return pins;
    };

    /**
     * true??? ??? ?????? ??????, false??? ?????? ?????? ????????? ????????? ???????????? ?????????.
     * null??? ?????? ??? ??? ?????? ????????? 2??? ?????? ??????????????? ????????? ????????? ??????.
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
     *
     * @param {number} pinId
     * @returns
     */
    deletePinByValues = async (pinId) => {
        const deletedPin = await Pin.destroy({
            where: { pinId }
        });

        if (deletedPin === 1) return true;
        else return false;
    };
}

module.exports = PinRepository;
