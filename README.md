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


![image](https://user-images.githubusercontent.com/86306802/186229139-157a89ea-bc7e-485b-879b-2f20aecc7664.png) ![image](https://user-images.githubusercontent.com/86306802/186229155-2ed114fd-4517-4fc4-902d-92dead0fb62a.png)

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
---
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
![api1](https://user-images.githubusercontent.com/109029407/186673278-dbdc7f9d-6ead-43e9-9806-214d23aab847.png)
![api2](https://user-images.githubusercontent.com/109029407/186673294-15ff396f-5fda-4c1e-bd1a-470202c62450.png)
![api3](https://user-images.githubusercontent.com/109029407/186673307-bf4459be-2991-458e-b7b4-1b0c9a4021d1.png)
![api4](https://user-images.githubusercontent.com/109029407/186673316-bede57f3-a31a-4fd2-9e2c-d5eb0631a175.png)
![api5](https://user-images.githubusercontent.com/109029407/186673330-8596d943-6e45-43ab-bdf6-baf0053db1aa.png)

---
## ERD
![erd](https://user-images.githubusercontent.com/109029407/186674452-5e53dfd8-cb8f-4b5b-90ee-f4774db45559.png)

---
## 폴더 트리
![폴더구조](https://user-images.githubusercontent.com/109029407/186675501-13aa3e46-e903-4a3d-9ca2-73b0c6a509ff.png)

