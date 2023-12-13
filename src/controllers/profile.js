const post = require("../models/post")
const User = require("../models/user")

async function renderProfile(req, res, next) {
    try {
        const posts = await post.find({ "author.id": req.params.id }).populate('comments').sort({ createdAt: -1 })
        const user = await User.findById(req.params.id)
        req.flash('success', '프로필을 불러오는데 성공했습니다.');
        res.render('profile', { posts: posts, user: user })
    } catch (err) {
        req.flash('error', '프로필을 불러오는데 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}
async function renderEditProfile(req, res, next) {
    req.flash('success', '프로필을 수정 페이지를 불러왔습니다.');
    res.render('profile/edit-profile', {user: req.user})
}
async function editProfile(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        req.flash('success', '프로필 업데이트를 성공했습니다.');
        res.redirect('/profile/' + req.params.id);
    } catch (err) {
        req.flash('error', '프로필 업데이트를 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

module.exports = { renderProfile, renderEditProfile, editProfile }