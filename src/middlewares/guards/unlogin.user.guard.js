const e = require('express');
const { JwtProvider } = require('../../modules/_.module.loader');
const { exceptionHandler } = require('../handler/exception.handler');

/**
 * JWT
 *
 * @param { e.Request } req
 * @param { e.Response } res
 * @param { e.NextFunction } next
 */
const unloginUserGuard = (req, res, next) => {
    const bearer = req?.headers?.authorization;

    // `Beaer Token` 이 아예 없을 경우
    if (!bearer)
        return res.status(401).json({
            isSuccess: false,
            message: `${req.method} ${req.originalUrl} 기능은 토큰이 없는 사용자는 이용할 수 없습니다.`,
            result: {}
        });

    const jwtProvider = new JwtProvider();

    // `Baerer Token` 을 `Token` 으로 변환
    const token = jwtProvider.extract(bearer);

    try {
        /**
         * `Token` 에서 Payload 만 추출
         * @type { { userId: string, nickname: string } } */
        const payload = jwtProvider.decodeToken(token);

        req.body.userId = payload.userId;
        req.body.nickname = payload.nickname;

        return next();
    } catch (err) {
        const exception = exceptionHandler(err);

        const path = `${req.method} ${req.originalUrl}`;
        const errMessage = JSON.stringify(exception.message);

        return res.status(401).json({
            isSuccess: false,
            message: `${path}기능은 토큰이 없는 사용자는 이용할 수 없습니다. ${errMessage}`,
            result: {}
        });
    }
};

module.exports = unloginUserGuard;
