const User = require("../models/user");

// 친구 페이지 렌더링 컨트롤러
async function renderFriend(req, res, next) {
    try {
        const users = await User.find({})
        req.flash('success', '친구 페이지를 불러왔습니다.');
        res.render('friend', { users: users })
    } catch (err) {
        req.flash('error', '친구 페이지를 불러오는데 실패했습니다.');
        res.redirect('/post');
        next(err);
    }
}

// 친구 추가 컨트롤러
async function addFriend(req, res, next) {
    try {
        const user = await User.findById(req.params.id)
        await User.findByIdAndUpdate(user._id, { friendsRequests: user.friendsRequests.concat([req.user._id]) })
        req.flash('success', '친구 추가 요청을에 보냈습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '친구 추가 요청에 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

// 친구 요청 취소 컨트롤러
async function cancelFriendRequest(req, res, next) {
    try {
        const user = await User.findById(req.params.firstId)
        await User.findByIdAndUpdate(user._id, { friendsRequests: user.friendsRequests.concat([req.user._id]) })
        const filteredFriendsRequests = user.friendsRequests.filter(friendId => friendId !== req.params.secondId);
        await User.findByIdAndUpdate(user._id, { friendsRequests: filteredFriendsRequests })
        req.flash('success', '친구 요청 취소를 성공했습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '친구 요청 취소를 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}


// 친구 요청 수락 컨트롤러
async function acceptFriendRequest(req, res, next) {
    try {
        const user = await User.findById(req.params.id)
        await User.findByIdAndUpdate(user._id, { friends: user.friends.concat([req.user._id]) })
        await User.findByIdAndUpdate(req.user._id, {
            friends: req.user.friends.concat([user._id]),
            friendsRequests: req.user.friendsRequests.filter(friendId => friendId !== user._id.toString())
        })
        req.flash('success', '친구 추가를 성공했습니다.');
        res.redirect('back');
    } catch (err) {
        req.flash('error', '친구 추가를 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

// 친구 삭제 컨트롤러
async function removeFriend(req, res, next) {
    try {
    const user = await User.findById(req.params.id)
    await User.findByIdAndUpdate(user._id, {friends: user.friends.filter(friendId => friendId !== req.user._id.toString())})
    await User.findByIdAndUpdate(req.user._id, { friends: req.user.friends.filter(friendId => friendId !== req.params.id.toString())})
    req.flash('success', '친구 삭제하는데 성공했습니다.');
    res.redirect('back');
    } catch (err) {
        req.flash('error', '친구 삭제를 실패했습니다.');
        res.redirect('back');
        next(err);
    }
}

module.exports = { renderFriend, addFriend, cancelFriendRequest, acceptFriendRequest, removeFriend}