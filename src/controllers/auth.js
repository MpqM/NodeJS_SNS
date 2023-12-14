const passport = require('passport');
const User = require('../models/user')

// 로그인 컨트롤러
function login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error', '유저를 찾을수 없습니다.');
            res.redirect("/login");
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            req.flash('success', '로그인에 성공했습니다.');
            res.redirect('/post')
        })
    })(req, res, next);
}

// 회원가입 컨트롤러
async function signup(req, res, next) {
    const user = new User(req.body);
    try {
        await user.save()
        req.flash('success', '회원가입에 성공했습니다.');
        res.redirect('/login');
    } catch (err) { console.log(err) }
}

// 로그아웃 컨트롤러
function logout(req, res, next) {
    req.logOut(function (err) {
        if (err) return next(err)
        res.redirect('/login')
    })
}

// Google 로그인 컨트롤러
function googleLogin(req, res, next) { passport.authenticate('google')(req, res, next); }

// Google 로그인 콜백 컨트롤러
function googleCallback(req, res, next) { passport.authenticate('google', { successRedirect: '/post', failureRedirect: '/login', })(req, res, next); }

module.exports = { login, signup, logout, googleLogin, googleCallback }