const express = require('express');
const { checkAuthenticated, checkIsMe } = require('../middlewares/auth');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const profileController = require('../controllers/profile');
router.get('/:id', checkAuthenticated, profileController.renderProfile);

router.get('/edit/:id', checkIsMe, profileController.renderEditProfile);

router.put('/edit/:id', checkIsMe, profileController.editProfile);

module.exports = router;