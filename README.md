# PinterestBE

항해99 8기 7주차 5조 백엔드 레포지토리입니다

!! 서비스 시연 영상 자리 !!

-   노션 [7주차 클론 코딩, Pinterest](https://www.notion.so/7-8bd521151d034477ba4cb126f3729a1c)
-   FE Repo [CloneCoding-Pinterest / PinterestFE](https://github.com/CloneCoding-Pinterest/PinterestFE)
-   BE Repo [CloneCoding-Pinterest / PinterestBE](https://github.com/CloneCoding-Pinterest/PinterestBE)

!! 백앤드 다이어그램 !!

## 팀원

| 성함 | GitHub | Contact |
| :-- | :-- | :-: |
| 이민석 | [@unchaptered](https://github.com/unchaptered) | [기술 블로그](https://velog.io/@unchapterd) / [TIL 용 블로그](https://velog.io/@unchaptered_til) |
| 황수민 | [@sumin-dev](https://github.com/sumin-dev) | - |
| 이수범 | [@subeom-Lee](https://github.com/subeom-Lee) | - |

### 모듈 리스트

```json
"dependencies": {
    "joi": "^17.6.0",               // 유효성 검증 라이브러리
    "cors": "^2.8.5",               // CORS 이슈 해결을 위한 라이브러리
    "express": "^4.18.1",           // Express 라이브러리

    "jsonwebtoken": "^8.5.1",       // JWT 생성을 위한 아리브러리
    "axios": "^0.27.2",             // Kakao 사용자 정보 요청을 위한 라이브러리

    "sequelize": "^6.21.4",         // ORM 라이브러리
    "mysql2": "^2.3.3",             // ORM 사용을 위한 종속성 라이브러리

    "dotenv": "^16.0.1",            // 적용 대기 중인 라이브러리

    // 버젼 이슈가 존재하기 때문에 다음 버전을 준수해야함
    "multer": "^1.4.5-lts.1",       // multipart-form 해석을 위한 라이브러리
    "multer-s3": "^2.10.0",         // aws-sdk 와 multer 호환을 위한 종속성 라이브러리
    "aws-sdk": "^2.1195.0",         // aws 서비스를 사용하기 위한 라이즈러리
},
"devDependencies": {
    "prettier": "^2.7.1",           // 팀 컨밴션 통일을 위한 라이브러리
    "husky": "^8.0.1",              // Git Hooks 지원 라이브러리
    "lint-staged": "^13.0.3",       // Git add 에 대해서 문서 수정 (서식에 맞게) 라이브러리

    "sequelize-cli": "^6.4.1",      // Sequelize 지원 라이브러리

    "jest": "^28.1.3",              // 테스트 코드 라이브러리
    "faker": "^5.5.3",              // Mock Data 생성 라이브러리
    "node-mocks-http": "^1.11.0",   // Mock Req, Res 생성 라이브러리
    "supertest": "^6.2.4",          // 테스트 코드 라이브러리
    "superagent": "^8.0.0",         // 테스트 코드 라이브러리

    "cross-env": "^7.0.3",          // 적용 대기 중인 라이브러리
},
```

## API 명세서

- 작성일 : `2022-08-19`

### pin

```jsx
pinId     : number
userId    : number
title     : string
content   : string
picKey    : string
picUrl    : string
```

### comment

```jsx
commentId  : number
userId     : number
pinId      : number
content    : string
createdAt  : Date

`localhost:3000/api/pin?page=${1}&pageCount=${10}`
```

### Response Form

```jsx
isSuccess : boolean
message   : string
result    : object
```

```jsx
{
  isSuccess: true,
  message: '',
  result: {
  }
}
```

### JWT Error `JWT 에러 존재`

```jsx
//  JWT 토큰이 필요한 도메인에서는 다음의 에러가 발생할 수 있습니다.
{
  isSuccess: false,
  message: “토큰이 필요합니다.” || “만료된 토큰입니다.” || “유효하지 않은 토큰입니다.” || err.message,
  result: {}
}
```

| 분류 | 기능 | Method | URI | JWT | Request | Response | Response(Error) | 프론트엔드 담당자/구현 여부 | 백엔드 담당자/구현 여부 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 인트로 페이지 | 페이지네이션(무한 스크롤) |  |  |  |  |  |  | 영은님 |  |  |
|  | Kakao 의 AccessToken / RefreshToken 을 기반으로 Pinterest 의 AccessToken / RefreshToken 을 발급 | POST | /api/auth/register |  | {accessToken: 'Kakao 토큰', refreshToken: 'Kako 토큰’,} | {isSuccess: true, message: “카카오 로그인이 완료되었습니다.”, result: { acccessToken: ‘Pinterest 토큰’, refreshToken: ‘Pinterest 토큰’ }} |{
  isSuccess: false,
  message: “Pin 조회에 실패하였습니다.” || err.message,
  result: {},
  tokenErorCode: ‘고유문자열’
} | 영은님 | 민석님 완료 | KAO_TKN_001 = ‘잘못된 토큰(해킹)’

KAO_TKN_002 = ‘만료된 엑세스 토큰’
KAO_TKN_003 = ‘만료된 리프레쉬 토큰’

카카오 Token 을 Pinterest Token 으로 변환시키고 모두 성공 시에 로그인 성공 |
|  | Pinterest 의 AccessToken 재발급 | GET | /api/auth/token?refreshToken= | - | - | {
  isSuccess: true,
  message: “Pin 조회에 성공했습니다.”,
  result: { 
     acccessToken: ‘Pinterest 토큰’
  }
} | {
  isSuccess: false,
  message: “Pin 조회에 실패하였습니다.” || err.message,
  result: {},
  tokenErorCode: ‘고유문자열’
} | 영은님 | 민석님 완료 | PIN_TKN_001 = ‘잘못된 토큰(해킹)’

PIN_TKN_010 = ‘만료된 엑세스 토큰’
PIN_TKN_011 = ‘만료된 리프레쉬 토큰’

Axios.Interceptor에서 PInterset 의 AccessToken 이 만료되었을 때, 이 API 로 RefreshToken 과 함께 요청을 보내서 새로운 AccessToken 을 발급받고 기존의 로직을 진행 |
|  | Pinterest 의 RT 를 DB 에서 모두 지우고 로그아웃 처리 진행 | GET | /api/auth/del-token?refreshToken= |  |  | {
  isSuccess: true,
  message: “Pin 로그아웃에 성공하였습니다,
  result: { }
} | {
  isSuccess: false,
  message: “이미 로그아웃된 사용자입니다.” || ‘존재하지 않는 사용자입니다.’ || err.message,
  result: {},
  tokenErorCode: ‘고유문자열’
} | 영은님 | 민석님 완료 | PIN_TKN_001 = ‘잘못된 토큰(해킹)’

PIN_TKN_010 = ‘만료된 엑세스 토큰’
PIN_TKN_011 = ‘만료된 리프레쉬 토큰’

 |
|  | 제거 | 제거 | /api/auth/del-account | - | {
   refreshToken: ‘Pinterest 토큰’
} | {
  isSuccess: true,
  message: “Pin 탈퇴에 성공하였습니다,
  result: { }
} | {
  isSuccess: false,
  message: “이미 탈퇴된사용자입니다.” || err.message,
  result: {},
  tokenErorCode: ‘고유문자열’
} | 영은님 | 민석님  | PIN_TKN_001 = ‘잘못된 토큰(해킹)’

PIN_TKN_010 = ‘만료된 엑세스 토큰’
PIN_TKN_011 = ‘만료된 리프레쉬 토큰’

 |
|  | 회원탈퇴(보류) | DELETE |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |
| 마이 페이지 | 내 프로필 조회 | GET |  | - | 개수 |  |  | 먼저 끝나는 사람 |  |  |
|  | 내 프로필 수정(보류) | PUT |  | - |  |  |  |  |  |  |
|  | 무한 스크롤(보류) |  |  |  |  |  |  |  |  | 내가 작성한 핀 목록을 
무한 스크롤로 보여줌. |
|  |  |  |  |  |  |  |  |  |  |  |
| 메인 페이지 | 헤더 |  |  |  |  |  |  | 민영님 완료
(로그인 및 회원가입 방식 결정되면
조건부 렌더링으로 수정할 예정) |  | * 로그인 여부에 따라 조건부 렌더링

로그인 했을 시: 
로고(홈, 메인 페이지), 핀 등록, 검색창, 
프로필 아이콘(마이 페이지), 
최근 본 핀 히스토리

로그인 안 했을 시:
로고, 검색창, 로그인, 회원가입 |
|  | 핀 전체 조회 | GET | /api/pin?page=&count=&target= | target 이 all 이면 토큰 필요 없고

target 이 mine 이면 토큰 필요 - O (비고 참고) | - | {
  isSuccess: true,
  message: “Pin 조회에 성공했습니다.”,
  result: {
      pinList: [{
          pinId: 1231212,
          author: ‘pin 생성자’,
          title: ‘pin 작성자’,
          content: ‘pin 내용’,
          picUrl: ‘http://’,
          picSize: ‘small’
      }]
  }
} | {
  isSuccess: false,
  message: “Pin 조회에 실패하였습니다.” || err.message,
  result: {}
}

JWT 에러 존재 - 문서 상단 확인 해주세요. | 먼저 끝나는 분 | 수민님 완료 | 1. 몇 페이지인지:  page
2. 한 페이지당 몇 개인지: count
3. 모든 핀 / 내 핀 
: target = all / mine

제약 조건 
: target이 mine 때만 토큰 필요

- 조회 시 result.pinList의 길이가 
0이 될 수도 있음

기본값 [update]
- page : 1
- count : 18 |
|  | 무한 스크롤 |  |  |  |  |  |  | 민영님 |  |  |
|  | 벽돌식 레이아웃 |  |  |  |  |  |  | 민영님 완료 |  |  |
| 핀 생성  모달 | 핀 등록 | POST | /api/pin?title=&content=&picSize= | O | {
  picValue: FormData
} | {
  isSuccess: true,
  message: “Pin 등록에 성공했습니다.”,
  result: {
      pin: {
          pinId: 1231212,
          author: ‘pin 생성자’,
          title: ‘pin 제목’,
          content: ‘pin 내용’,
          picUrl: ‘http://’,
          picSize: ‘small’
      }
  }
} | {
  isSuccess: false,
  message: “Pin 등록에 실패하였습니다.” || err.message,
  result: {}
}

JWT 에러 존재 - 문서 상단 확인 해주세요. | 민영님 완료 | 수민님 완료 | picSize 는 꼭 다음의 문자열을 정확하게 맞춰 주세요.

- small
- medium
- large

picSize 는 필수값으로 누락 시 에러를 되돌려드립니다.

* picSize의 문자열을 소문자로 정정해주시면 감사하겠습니다. 대문자로 하면 왜인지 오류가 나요 |
|  |  |  |  |  |  |  |  |  |  |  |
| 상세 페이지 | 핀 상세 조회 | GET | /api/pin/:pinId | - | - | {
  isSuccess: true,
  message: “Pin 조회에 성공했습니다.”,
  result: {
      pin: {
          pinId: 1231212,
          author: ‘pin 생성자’,
          title: ‘pin 제목’,
          content: ‘pin 내용’,
          picUrl: ‘http://’,
          picSize: ‘small’
          commentCount: 13
      }
  }
} | {
  isSuccess: false,
  message: “Pin 조회에 실패하였습니다.” || err.message,
  result: {}
} | 창용님 | 수민님 완료 |  |
|  | 핀 수정 | PUT | /api/pin/:pinId | O (비고 참고-본인확인) | {
   title: “핀 제목”,
   content: “핀 내용”
} | {
  isSuccess: true,
  message: “Pin 수정에 성공했습니다.”,
  result: {
      pin: {
          pinId: 1231212,
          author: ‘pin 생성자’,
          title: ‘pin 제목’,
          content: ‘pin 내용’,
          picUrl: ‘http://’
      }
  }
} | {
  isSuccess: false,
  message: “Pin 수정에 실패하였습니다.” || err.message,
  result: {}
}

JWT 에러 존재 - 문서 상단 확인 해주세요. | 창용님 | 수민님 완료 | tags는 확정된 사항은 아니고, 
구현되는 대로 Express가 받아지는지 
확인해서 수정 가능

제약 조건
: JWT의 userId와 
pinId의 작성자 userId 가 동일 |
|  | 핀 삭제 | DEL | /api/pin/:pinId | O (비고 참고-본인확인) | - | {
  isSuccess: true,
  message: “Pin 삭제에 성공했습니다.”,
  result: {}
} | {
  isSuccess: false,
  message: “Pin 삭제에 실패하였습니다.” || err.message,
  result: {}
}

JWT 에러 존재 - 문서 상단 확인 해주세요. | 창용님 | 수민님 완료 | alert(”핀을 정말 삭제하시겠습니까?”)
: 확인/취소 

제약 조건
: JWT의 userId와 
pinId의 작성자 userId 가 동일

 |
|  | 댓글 전체 조회
(특정 핀 모든 댓글) | GET | /api/comment?pinId= | - | - | {
  isSuccess: true,
  message: “댓글 조회에 성공했습니다.”,
  result: {
     commentList: [{
       commentId: 123,
       author: “작성자”,
       content: ‘댓글 내용’,
       createdAt: ‘DATE Form’
     }]
  }
} |  | 창용님 | 수범님 완료 (버그 수정 중) |  |
|  | 댓글 작성 | POST | /api/comment | O | {
   pinId: 123432,
   content: “댓글 내용”
} | {
  isSuccess: true,
  message: “댓글 작성에 성공했습니다.”,
  result: {
     comment: {
       commentId: 123,
       author: “작성자”,
       content: ‘댓글 내용’,
       createdAt: ‘DATE Form’
     }
  }
} | 
JWT 에러 존재 - 문서 상단 확인 해주세요.

 | 창용님 | 수범님 완료 (버그 수정 중) |  |
|  | 댓글 수정 | PUT | /api/comment/:commentId | O (비고 참고-본인확인) | {
   content: “댓글 내용”
} | {
  isSuccess: true,
  message: “댓글 수정에 성공했습니다.”,
  result: {
     comment: {
       commentId: 123,
       author: “작성자”,
       content: ‘댓글 내용’,
       createdAt: ‘DATE Form’
     }
  }
} | 
JWT 에러 존재 - 문서 상단 확인 해주세요. | 창용님 | 수범님 완료 (버그 수정 중) | 제약 조건
: JWT의 userId와 
pinId의 작성자 userId 가 동일 |
|  | 댓글 삭제 | DEL | /api/comment/:commentId | O (비고 참고-본인확인) | - | {
  isSuccess: true,
  message: “댓글 삭제에 성공했습니다.”,
  result: {}
} | 
JWT 에러 존재 - 문서 상단 확인 해주세요. | 창용님 | 수범님 완료 (버그 수정 중) | 제약 조건
: JWT의 userId와 
pinId의 작성자 userId 가 동일 |
|  | 리댓글(보류) |  |  |  |  |  |  |  |  | 댓글 좋아요, 아이디 태그 |
|  | 좋아요(보류) |  |  |  |  |  |  |  |  |  |


![image](https://user-images.githubusercontent.com/86306802/186229139-157a89ea-bc7e-485b-879b-2f20aecc7664.png) ![image](https://user-images.githubusercontent.com/86306802/186229155-2ed114fd-4517-4fc4-902d-92dead0fb62a.png)
