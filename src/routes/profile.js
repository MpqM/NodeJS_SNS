const express = require('express');
const { checkAuthenticated, checkIsMe } = require('../middlewares/auth');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const profileController = require('../controllers/profile');

// 프로필 경로(/profile)요청 라우팅
router.get('/:id', checkAuthenticated, profileController.renderProfile);
router.get('/edit/:id', checkIsMe, profileController.renderEditProfile);
router.put('/edit/:id', checkIsMe, profileController.editProfile);

module.exports = router;