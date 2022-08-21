const axios = require('axios');

class KakaoProvider {
    constructor() {}

    /** @param { string } accessToken  */
    getUserDataByKakaoAccessToken = async (accessToken) => {
        try {
            const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            });
            console.log(response.data);

            /**
             *      {
             *         id: 숫자-타입의-고유값,
             *         connected_at: '2022-08-19T19:08:29Z',
             *         properties: { nickname: '카카오톡-사용자명' },
             *         kakao_account: {
             *             profile_nickname_needs_agreement: false,
             *             profile: { nickname: '카카오톡-사용자명' },
             *             has_email: true,
             *             email_needs_agreement: false,
             *             is_email_valid: true,
             *             is_email_verified: true,
             *             email: '카카오톡-사용자-이메일',
             *             has_age_range: true,
             *             age_range_needs_agreement: false,
             *             age_range: '20~29',
             *             has_gender: false,
             *             gender_needs_agreement: false
             *         }
             *      }
             *
             */

            // return {
            //     id: 2131421312,
            //     connected_at: '2022-08-19T19:08:29Z',
            //     properties: {
            //         nickname: '카카오톡-사용자명'
            //     },
            //     kakao_account: {
            //         profile_nickname_needs_agreement: false,
            //         profile: {
            //             nickname: '카카오톡-사용자명'
            //         },
            //         has_email:true,
            //         email_needs_agreement: false,
            //         is_email_valid: true,
            //         is_email_verified: true,
            //         email: '카카오톡-사용자-이메일',
            //         has_age_range: true,
            //         age_range_needs_agreement: false,
            //         age_range: '20~29',
            //         has_gender: false,
            //         gender_needs_agreement: false
            //     }
            // };

            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

module.exports = KakaoProvider;
