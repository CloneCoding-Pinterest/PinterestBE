const { User, UserDetail } = require('../../sequelize/models');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class UserRepository {
    constructor() {}

    /**
     * @param { number } snsTokenId
     * @returns { Promise<{ userId: number, snsTokenId: number, pinTokenId: number, detailId: number } | null> }
     */
    findUserBySnsTokenId = async (snsTokenId) => {
        const user = await User.findOne({
            where: {
                snsTokenId
            },
            attributes: ['userId', 'snsTokenId', 'pinTokenId', 'detailId']
        });

        if (user === null) return null;
        else {
            /** @type { { userId: number, snsTokenId: number, pinTokenId: number, detailId: number } } */
            const findedUser = user.dataValues;

            return findedUser;
        }
    };

    /**
     *
     * @param { number } snsTokenId
     * @param { number } pinTokenId
     * @param { number } detail
     */
    uploadUser = async (snsTokenId, pinTokenId, detailId) => {
        const user = await User.create({
            snsTokenId,
            pinTokenId,
            detailId
        });

        /** @type { { userId: number, snsTokenId: number, pinTokenId: number, detailId: number } } */
        const uploadedUser = user.dataValues;
        return uploadedUser;
    };

    /**
     *
     * @param { string } nickname
     * @param { string } email
     * @param { string } ageRnage
     */
    uploadUserDetail = async (nickname, email, ageRange) => {
        const userDetail = await UserDetail.create({ nickname, email, ageRange });

        /** @type { { detailId: number, nickname: string, emial: string, ageRange } } */
        const uploadedUserDetail = userDetail.dataValues;

        return uploadedUserDetail;
    };
}

module.exports = UserRepository;
