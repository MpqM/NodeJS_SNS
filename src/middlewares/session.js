// 세션 핸들러 미들웨어
function sessionHandler(req, res, next) {
    if (req.session && !req.session.regenerate) { req.session.regenerate = (cb) => { cb() } }
    if (req.session && !req.session.save) { req.session.save = (cb) => { cb() } }
    next()
}

module.exports = sessionHandler;