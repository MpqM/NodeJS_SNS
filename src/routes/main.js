const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/auth');

// 루트경로(/)요청 라우팅
router.get('/', checkAuthenticated, (req, res) => { res.redirect('/post'); });
router.get('/login', checkNotAuthenticated, (req, res) => { res.render('auth/login');})
router.get('/signup', checkNotAuthenticated, (req, res) => {res.render('auth/signup');})

module.exports = router;