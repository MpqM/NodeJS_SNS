const express = require('express');
const { checkAuthenticated, checkPostOwn, checkCommentOwn } = require('../middlewares/auth');
const postController = require('../controllers/post')
const upload = require('../middlewares/multer');
const router = express.Router();

// 게시글 경로(/post)요청 라우팅
// 게시글
router.get('/', checkAuthenticated, postController.renderPost);
router.post('/', checkAuthenticated, upload, postController.createPost);
router.get('/edit/:id', checkPostOwn, postController.renderEditPost);
router.put('/edit/:id', checkPostOwn, postController.editPost);
router.delete('/:id', checkPostOwn, postController.deletePost);

// 좋아요
router.put('/like/:id', checkAuthenticated, postController.likePost);

// 댓글
router.post('/comment/:id/', checkAuthenticated, postController.createComment);
router.delete('/comment/:id/:commentId', checkCommentOwn, postController.deleteComment);
router.get('/comment/edit/:id/:commentId', checkCommentOwn, postController.renderEditComment);
router.put('/comment/edit/:id/:commentId', checkCommentOwn, postController.editComment);

module.exports = router;