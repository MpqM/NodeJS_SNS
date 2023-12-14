const express = require('express');
const { checkAuthenticated } = require('../middlewares/auth');
const User = require('../models/user');
const router = express.Router();
const friendController = require('../controllers/friend');

// 친구 경로(/friend)요청 라우팅
router.get('/', checkAuthenticated, friendController.renderFriend);
router.put("/addfriend/:id", checkAuthenticated, friendController.addFriend);
router.put('/cancelfriendrequest/:firstId/:secondId', checkAuthenticated, friendController.cancelFriendRequest);
router.put('/acceptfriendrequest/:id', checkAuthenticated, friendController.acceptFriendRequest);
router.put('/removefriend/:id', checkAuthenticated, friendController.removeFriend);

module.exports = router;