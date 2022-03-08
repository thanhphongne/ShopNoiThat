const ErrorHander = require('../utils/errorhander')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
    })
    const {name, email, password} = req.body

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })

    sendToken(user, 201, res)
})


// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
    return next(new ErrorHander("Nhập email và mật khẩu", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
    return next(new ErrorHander("Email hoặc mật khẩu không đúng", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
    return next(new ErrorHander("Email hoặc mật khẩu không đúng", 401));
    }

    const token = user.getJWTToken();

    sendToken(user, 200, res)
});

// logout user
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, { 
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
    })
})

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return next(new ErrorHander("Không tìm thấy người dùng này", 404))
    }

//Get ResetPassword Token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Chọn đường dẫn bên dưới để đặt lại mật khẩu của bạn:- \n\n ${resetPasswordUrl} \n\n
        Nếu bạn không có yêu cầu đặt lại mật khẩu thì hãy bỏ qua email này!`;

    try {
        
        await sendEmail({
            email: user.email,
            subject: `Đặt lại mật khẩu Shop Nội Thất`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email được gửi đến ${user.email} thành công`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false})

        return next(new ErrorHander(error.message, 500));
    }
})

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    
    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    })

    if(!user) {
        return next(new ErrorHander('Yâu cầu đặt lại mật khẩu không hợp lệ hoặc đã hết hạn', 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander('Mật khẩu xác nhận không khớp', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
    return next(new ErrorHander("Sai mật khẩu", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("Mật khẩu xác nhận không khớp", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (!req.body.avatar) {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
    success: true,
    });
});

// get all users -- admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    
    res.status(200).json({
        success: true,
        users
    })
})

//get single user -- admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    
    if(!user) {
        return next(new ErrorHander(`Không tìm thấy người dùng có id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update user role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // i will update avt later :))

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if(!user) {
        return next(new ErrorHander(`Không tìm thấy người dùng nào với id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
    })
})

//update user profile
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    // i will update avt later :))

    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new ErrorHander(`Không tìm thấy người dùng nào với id: ${req.params.id}`));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId)

    await user.remove()

    res.status(200).json({
        success: true,
        message: "Đã xóa người dùng"
    })
})