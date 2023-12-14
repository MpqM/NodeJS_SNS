// 세션 객체 재정의 미들웨어, 세션 속성에 regenerate, save를 추가
function sessionHandler(req, res, next) {
    if (req.session && !req.session.regenerate) { req.session.regenerate = (cb) => { cb() } }
    if (req.session && !req.session.save) { req.session.save = (cb) => { cb() } }
    next()
}

module.exports = sessionHandler;