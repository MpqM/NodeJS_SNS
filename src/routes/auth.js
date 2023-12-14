const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// 인증 경로(/auth) 요청 라우팅
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

module.exports = router;