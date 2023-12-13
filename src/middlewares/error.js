const createError = require('http-errors');
const isHttpError = require("http-errors").isHttpError;

// 404 오류를 생성하고 다음 미들웨어에 전달하는 핸들러
const notFoundHandler = (req, res, next) => { next(createError(404, 'Endpoint not found')); };

// 나머지 오류를 처리하고 클라이언트에 적절한 응답을 보내는 핸들러
const errorHandler = (err, req, res, next) => {
    console.error(err);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    if (isHttpError(err)) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ err: errorMessage });
};

module.exports = { notFoundHandler, errorHandler };