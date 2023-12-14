const cookieSession = require('cookie-session');
const express = require('express');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const profileRouter = require('./routes/profile');
const friendRouter = require('./routes/friend');
const sessionHandler = require('./middlewares/session');
const flashHandler = require('./middlewares/flash');
const { notFoundHandler, errorHandler } = require('./middlewares/error');
require('dotenv').config()

// 쿠키-세션 설정, 세션 객체 재정의 미들웨어
app.use(cookieSession({ name: 'cookie-session', keys: [process.env.COOKIE_ENCRYPTION_KEY] }))
app.use(sessionHandler)

// Passport 초기화 및 세션 설정
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// 로깅, 바디 파서 설정
app.use(morgan('dev')) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// flash, 메서드 오버라이딩 설정
app.use(flash());
app.use(methodOverride('_method'));

// 뷰 템플릿 ejs 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB 연결 설정
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => { console.log('mongodb connected') })
    .catch((err) => { console.log(err); })

// 정적파일 처리
app.use(express.static(path.join(__dirname, 'public')));

// flash 메시지 핸들링 미들웨어 등록
app.use(flashHandler)

// 라우터 등록
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/profile', profileRouter);
app.use('/friend', friendRouter);

// 에러 핸들링 미들웨어
app.use(notFoundHandler)
app.use(errorHandler)

// 서버 시작
app.listen(process.env.PORT, () => { console.log(`Server is Running on http://localhost:${process.env.PORT}`); })