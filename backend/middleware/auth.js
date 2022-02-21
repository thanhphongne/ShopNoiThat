const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {

    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Đăng nhập để thực hiện hành động trên", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id);

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler('Bạn không có quyền thực hiện hành động trên', 403)
            )}

        next()
    }
}