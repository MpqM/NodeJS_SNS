const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// 인증 되었는지 확인, 아니면 로그인 페이지로 리다이렉트
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {return next();}
    res.redirect('/login');
}

// 인증이 되었는지 확인 후 게시글 페이지로 리다이렉트
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return res.redirect('/post');}
    next();
}

// 게시글의 소유자인지 확인 후 접근 허가 및 거부
function checkPostOwn(req, res, next) {
    if (req.isAuthenticated()) {
        Post.findById(req.params.id, (err, post) => {
            if (err || !post) {
                req.flash('error', '포스트가 없거나 에러가 발생했습니다.');
                res.redirect('back');
            } else {
                if (post.author.id.equals(req.user._id)) {
                    req.post = post;
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', '로그인을 먼저 해주세요.');
        res.redirect('/login');
    }
}

// 댓글의 소유자인지 확인 후 접근 허가 및 거부
function checkCommentOwn(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, comment) => {
            if (err || !comment) {
                req.flash('error', '댓글을 찾는 도중에 에러가 발생했습니다.');
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    req.comment = comment;
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', '로그인을 해주세요.')
        res.redirect('/login');
    }
}

// 프로필 페이지에서 사용, 프로필이 자신인지 확인후 접근 권한 허가 및 거부
function checkIsMe(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, (err, user) => {
            if (err || !user) {
                req.flash('error', '유저를 찾는데 에러가 발생했습니다.');
                res.redirect('/profile/' + req.params.id);
            } else {
                if (user._id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('/profile/' + req.params.id);
                }
            }
        })
    } else {
        req.flash('error', '먼저 로그인을 해주세요.');
        res.redirect('/login');
    }
}

module.exports = { checkIsMe, checkCommentOwn, checkPostOwn, checkAuthenticated, checkNotAuthenticated }