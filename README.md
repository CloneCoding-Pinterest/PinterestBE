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

```cmd
./ecosystem.config.js
./src/sequelize/config/config.json
```

![image](https://user-images.githubusercontent.com/86306802/186229139-157a89ea-bc7e-485b-879b-2f20aecc7664.png) ![image](https://user-images.githubusercontent.com/86306802/186229155-2ed114fd-4517-4fc4-902d-92dead0fb62a.png)
