const { SnsTokens, PinTokens } = require('../../sequelize/models');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class AuthRepository {
    constructor() {}

    isExistsSnsTokenRowBySnsTokenId = async (snsTokenId) => {
        const snsToken = await SnsTokens.findByPk(snsTokenId);

        if (snsToken === null) return false;
        else return true;
    };

    isExistsPinTokenRowByPinTokenId = async (pinTokenId) => {
        const pinToken = await PinTokens.findByPk(pinTokenId);

        if (pinToken === null) return false;
        else return true;
    };

    /**
     * 카카오의 사용자 정보 받아오기 API 를 통해 받은 id 값을 기준으로 DB 에서 TokenId 탐색.
     *
     * 신규 가입자의 경우 null 이 반환되며, 기존 가입자는 snsTokenId 가 반환됩니다.
     *
     * @param { number } providedId
     * @returns { Promise< { snsTokenId: number }  | null> }
     */
    findTokenIdByProvidedId = async (providedId) => {
        console.log(`중복 검사 실행 (대상자 : ${providedId})`);

        const snsToken = await SnsTokens.findOne({
            where: {
                providedId
            },
            limit: 1,
            attributes: ['snsTokenId']
        });

        console.log(snsToken);

        if (snsToken === null) return null;
        else {
            /** @type { number } */
            const snsTokenId = snsToken.dataValues.snsTokenId;

            return { snsTokenId };
        }
    };

    uploadSnsToken = async (providedId, accessToken, refreshToken) => {
        const snsToken = await SnsTokens.create({
            providedId,
            accessToken,
            refreshToken
        });

        /** @type { { snsTokenId: number, category: string, providedId: number, accessToken: string, refreshToken: string } } */
        const createdSnsToken = snsToken.dataValues;
        return createdSnsToken;
    };

    uploadEmptyPinTokenRow = async () => {
        const pinToken = await PinTokens.create({});

        /**  @type { { pinTokenId: number, refreshToken: string } } */
        const craetedPinToken = pinToken.dataValues;
        return craetedPinToken;
    };

    updatePinToken = async (pinTokenId, refreshToken) => {
        const pinTokenRow = await PinTokens.update(
            {
                refreshToken
            },
            {
                where: {
                    pinTokenId
                }
            }
        );

        return;
    };

    apeendTokenIntoPinTokenRow = async (pinTokenId, refreshToken) => {
        const pinTokenRow = await PinTokens.update(
            {
                refreshToken
            },
            {
                where: {
                    pinTokenId
                }
            }
        );
    };

    /**
     * true 일 때는, 로그아웃 성공
     * false 일 때는, 이미 로그아웃한 사용자
     * null 일 때는, 중복 요청이나 알 수 없는 에러
     *
     * @param { number } pinTokenId
     * @returns { Promise<boolean | null > }
     */
    popRefreshTokenFromPinTokenRow = async (pinTokenId) => {
        const pinTokenRow = await PinTokens.update(
            {
                refreshToken: null
            },
            {
                where: {
                    pinTokenId
                }
            }
        );

        if (pinTokenRow[0] > 2) return null;
        else if (pinTokenRow[0] === 1) return true;
        else return false;
    };
}

module.exports = AuthRepository;
