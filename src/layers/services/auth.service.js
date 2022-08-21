const e = require('express');
const AuthRepository = require('../repositories/auth.repository');
const UserRepository = require('../repositories/user.repository');
const { KakaoProvider, JwtProvider } = require('../../modules/_.module.loader');
const { NotFoundException } = require('../../models/_.models.loader');

/**
 * \# 키워드를 붙이면 해당 클래스의 프로퍼티 안에서 `만` 호출이 가능하다.
 *
 */
class AuthService {
    #authRepository;
    #userRepository;
    #kakaoProvider;
    #jwtProvider;

    constructor() {
        this.#authRepository = new AuthRepository();
        this.#userRepository = new UserRepository();
        this.#kakaoProvider = new KakaoProvider();
        this.#jwtProvider = new JwtProvider();
    }

    /**
     * @param { { accessToken: string, refreshToken: string } } kakaoTokenDto
     */
    registerAccount = async (kakaoTokenDto) => {
        // true or false

        const userData = await this.#kakaoProvider.getUserDataByKakaoAccessToken(
            kakaoTokenDto.accessToken
        );

        const providedId = userData.id;

        // Pin 사이트 용 토큰 등록 절차 실행
        const accessToken = this.#jwtProvider.signAccessToken();
        const refreshToken = this.#jwtProvider.signRefreshToken({
            nickname: userData.kakao_account.profile.nickname
        });

        const findedSnsTokenId = await this.#authRepository.findTokenIdByProvidedId(providedId);

        if (findedSnsTokenId === null) {
            console.log('신규 로그인 가입 절차가 진행됩니다.');

            const email = userData.kakao_account.email;
            const nickname = userData.kakao_account.profile.nickname;
            const ageRange = userData.kakao_account.age_range;

            const [uploadedSnsToken, uploadedPinToken, uploadedUserDetail] = await Promise.all([
                (async () =>
                    await this.#authRepository.uploadSnsToken(
                        providedId,
                        kakaoTokenDto.accessToken,
                        kakaoTokenDto.refreshToken
                    ))(),
                (async () => await this.#authRepository.uploadPinToken(refreshToken))(),
                (async () =>
                    await this.#userRepository.uploadUserDetail(nickname, email, ageRange))()
            ]);

            // 최종 User 등록 절차 실행
            const uploadedUser = await this.#userRepository.uploadUser(
                uploadedSnsToken.snsTokenId,
                uploadedPinToken.pinTokenId,
                uploadedUserDetail.detailId
            );

            return { accessToken, refreshToken };
        } else {
            console.log('기존 회원의 재 로그인 절차가 실행 되었습니다.');

            const findedUser = await this.#userRepository.findUserBySnsTokenId(
                findedSnsTokenId.snsTokenId
            );
            await this.#authRepository.updatePinToken(findedUser.pinTokenId, refreshToken);

            return { accessToken, refreshToken };
        }
    };

    /**
     * @param { string } refreshToken
     */
    publichAccessToken = (refreshToken) => {};
}

module.exports = AuthService;
