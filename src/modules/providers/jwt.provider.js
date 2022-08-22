const jwtLib = require('jsonwebtoken');

class JwtProvider {
    static SECRET = 'sample_secret';
    static ALGORITHM = 'HS256';
    static ACCESS_EXPIRES_IN = '2h';
    static REFRESH_EXPIRES_IN = '2h';

    constructor() {}

    /**
     * @param { { userId: number } } payload
     * @returns { string }
     */
    signAccessToken(payload) {
        return jwtLib.sign(payload, JwtProvider.SECRET, {
            algorithm: JwtProvider.ALGORITHM,
            expiresIn: JwtProvider.ACCESS_EXPIRES_IN
        });
    }

    /**
     * @param { { userId: number, nickname: string } } payload
     * @returns { string }
     */
    signRefreshToken(payload) {
        return jwtLib.sign(payload, JwtProvider.SECRET, {
            algorithm: JwtProvider.ALGORITHM,
            expiresIn: JwtProvider.REFRESH_EXPIRES_IN
        });
    }

    /**
     * @param { string } token
     * @returns { string | Jwt.payload }
     * @throws `JsonWebTokenError`: invalid signature
     */
    verifyToken(token) {
        return jwtLib.verify(token, JwtProvider.SECRET);
    }

    /**
     * @param { string } token
     * @returns { string | Jwt.payload}
     */
    decodeToken(token) {
        return jwtLib.decode(token);
    }

    /**
     * Bearer jsonwebtoken
     * @param { string } bearerToken
     */
    extract(bearerToken) {
        return bearerToken.substring(7);
    }
}

module.exports = JwtProvider;
