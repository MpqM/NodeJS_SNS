# SNS
#### ⚪ About Project
* ##### NodeJS로 SNS 기본 기능 구현
* ##### Passport(local, google), cookie-session 인증
* ##### 게시글 불러오기, 생성, 수정, 삭제 / 댓글 불러오기, 생성, 수정, 삭제
* ##### 파일 업로드, 좋아요, 친구 추가 및 삭제, 프로필 수정

- - -

#### ⚪ Running Screen || Video
<p align ="center">
  <a href="https://www.youtube.com/watch?v=-PwSEkOKk4E"><img src ="https://img.shields.io/badge/youtube-FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white"/></a>
  </br>
  <img src="https://github.com/MpqM/NodeJS_SNS/assets/79093184/f6eb123c-2485-409c-9d8c-6decdce00eb1">
</p>

- - -

#### ⚪ Built With
<p align ="center">
  <img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img altt="CSS3"src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src ="https://img.shields.io/badge/ejs-B4CA65.svg?&style=for-the-badge&logo=ejs&logoColor=white"/> <img alt="javascript" src ="https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/> <img alt="nodedotjs" src ="https://img.shields.io/badge/nodejs-339933.svg?&style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img alt="express" src ="https://img.shields.io/badge/express-339933.svg?&style=for-the-badge&logo=express&logoColor=white"/> <img alt="mongodb" src ="https://img.shields.io/badge/mongodb-339933.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>

- - -

#### ⚪ Getting Started
```bash
# Prerequisites: npm, node, MongoDB Connection URL, Google Oauth Client
# execution
git clone https://github.com/MpqM/NodeJS_SNS
npm install
npm start
```

- - -

#### ⚪ Description
* ##### Post
    * ##### multer를 이용해 파일업로드 가능한 게시글 생성, 게시글 삭제, 수정
    * ##### 사용자 및 친구의 게시글을 조회
    * ##### 사용자 및 친구의 게시글에 댓글 생성, 삭제, 수정
    * ##### 이미 누르거나 눌리지 않은 좋아요를 구분해 처리하는 좋아요 기능
* ##### Friend: 가입된 사용자들 정보 기반 알 수 있는 사람들 표시, 친구 요청 추가/취소, 친구 삭제
* ##### Profile: 사용자, 친구 및 다른 사용자의 프로필 확인 및 자신의 프로필 수정 가능
* ##### else
  * #### Passport.isAuthenticated()를 이용한 미들웨어로 리소스, 라우팅 비인가 접근 보호
  * #### 페이지 이동시 오류, 성공 메시지를 보이기 위해 flash 사용 및 res.locals객체에 user 정보 저장
  * #### multer: 게시글 생성시 파일 업로드를 위해 사용
  * #### session: session객체의 regenerate, save 속성 추가

- - -

#### ⚪ Writer
<p align ="center">
  <img src ="https://img.shields.io/badge/gmail-EA4335.svg?&style=for-the-badge&logo=gmail&logoColor=white"/></a> <a href = "https://github.com/MpqM"><img src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/></a> <a href = "https://MpqM.tistory.com/"> <img src ="https://img.shields.io/badge/tistory-000000.svg?&style=for-the-badge&logo=Tistory&logoColor=white"/></a>
</p>

- - -
