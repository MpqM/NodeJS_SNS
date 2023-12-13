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
const friendsRouter = require('./routes/friend');
const sessionHandler = require('./middlewares/session');
const flashHandler = require('./middlewares/flash');
const { notFoundHandler, errorHandler } = require('./middlewares/error');
require('dotenv').config()

app.use(cookieSession({ name: 'cookie-session', keys: [process.env.COOKIE_ENCRYPTION_KEY] }))
app.use(sessionHandler)

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(morgan('dev')) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => { console.log('mongodb connected') })
    .catch((err) => { console.log(err); })


app.use(express.static(path.join(__dirname, 'public')));
app.use(flashHandler)


app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/profile', profileRouter);
app.use('/friend', friendsRouter);

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT, () => { console.log(`Server is Running on http://localhost:${process.env.PORT}`); })