const ErrorHandler = require('../utils/errorhander');

module.exports =(err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Lỗi máy chủ"

    // Wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Tài nguyên không tồn tại. Không hợp lệ: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error
    if(err.code === 11000) {
        const message = `Lỗi: ${Object.keys(err.keyValue)} đã được sử dụng`
        err = new ErrorHandler(message, 400)
    }

    // Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}