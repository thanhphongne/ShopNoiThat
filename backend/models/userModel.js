const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nhập tên của bạn'],
        maxLength: [30, 'Vui lòng đặt tên dưới 30 ký tự'],
        minLength: [4, 'Nên đặt dài hơn 4 ký tự']
    },
    email: {
        type: String,
        required: [true, 'Nhập email của bạn'],
        unique: true,
        validate: [validator.isEmail, 'Vui lòng nhập email hợp lệ']
    },
    password: {
        type: String,
        required: [true, 'Nhập mật khẩu của bạn'],
        minLength: [8, 'Nên đặt mật khẩu từ 8 ký tự'],
        select: false
    },
    phoneNo: {
        type: String,
        unique: true,
        },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: 'Khách hàng'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shippingInfo: [
        {
            address: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
            type: String,
            },
            phoneNo: {
            type: String,
            },
        }
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})


// JWT token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// Generating Password Reset token
userSchema.methods.getResetPasswordToken = function() {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

        return resetToken;
}



module.exports = mongoose.model("User", userSchema)


