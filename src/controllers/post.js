const { response } = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");

// 포스트
async function getPosts(req, res, next) {
    try {
        const posts = await Post.find().populate('comments').sort({ createdAt: -1 })
        req.flash('success', '포스트들을 불러오는데 성공했습니다.');
        res.render('post', { posts: posts, currentUser: req.user });
    } catch (err) {
        req.flash('error', '포스트들을 불러오는데 실패했습니다.');
        res.redirect("back");
        next(err);
    }
}

async function createPost(req, res, next) {
    try {
        console.log(req.body);
        let image = req.file ? req.file.filename : '';
        await Post.create({
            image,
            description: req.body.desc,
            author: {
                id: req.user._id,
                username: req.user.username
            },
        })
        req.flash('success', '포스트 생성에 성공했습니다.');
        res.redirect("back");
    } catch (err) {
        req.flash('error', '포스트 생성에 실패했습니다.');
        res.redirect("back");
        next(err);
    }
}

function renderEditPost(req, res, next) { res.render('post/edit-post', { post: req.post }) }

async function editPost(req, res, next) {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body)
        req.flash('success', '포스트 수정을 성공했습니다.');
        res.redirect('/post');
    } catch (err) {
        req.flash('error', '포스트 수정을 실패했습니다.');
        res.redirect("back");
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        await Post.findByIdAndDelete(req.params.id);
        req.flash('success', '포스트 삭제를 성공했습니다.');
        res.redirect('/post');
    } catch (err) {
        req.flash('error', '포스트 삭제를 실패했습니다.');
        res.redirect('/post');
        next(err);
    }
}

// 좋아요
async function likePost(req, res, next) {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.find(like => like === req.user._id.toString())) {
            const updatedLikes = post.likes.filter(like => like !== req.user._id.toString());
            await Post.findByIdAndUpdate(post._id, { likes: updatedLikes })
        } else {
            await Post.findByIdAndUpdate(post._id, { likes: post.likes.concat([req.user._id]) })
        }
        req.flash('success', '좋아요를 업데이트 했습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '좋아요 업데이트에 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

// 댓글
async function createComment(req, res, next) {
    try {
        const post = await Post.findById(req.params.id)
        const comment = await Comment.create(req.body)
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        await comment.save()
        post.comments.push(comment)
        await post.save()
        req.flash('success', '댓글 생성에 성공했습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '댓글 생성을 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

async function renderEditComment(req, res, next) {
    try {
        const post = await Post.findById(req.params.id)
        req.flash('success', '댓글 수정 페이지를 불러왔습니다.');
        res.render('post/edit-comment', { post: post, comment: req.comment })

    } catch (err) {
        req.flash('error', '댓글 수정 페이지를 불러오는데 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

async function editComment(req, res, next){
    try {
        await Comment.findByIdAndUpdate(req.params.commentId, req.body)
        req.flash('success', '댓글 수정을 성공했습니다.');
        res.redirect('/post');
    } catch (err) {
        req.flash('error', '댓글 수정을 실패했습니다.');
        res.redirect('post');
        next(err);
    }
}

async function deleteComment(req, res, next) {
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        req.flash('success', '댓글 삭제를 성공했습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '댓글 삭제를 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

module.exports = {
    getPosts, createPost, renderEditPost, editPost, deletePost,
    likePost, createComment, renderEditComment, editComment, deleteComment
}