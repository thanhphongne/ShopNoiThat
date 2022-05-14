const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    provider: {
        type: String,
        required: [true, "Nhập tên nhà cung cấp"],
    },
    price: {
        type: Number,
        required: [true, "Nhập giá nhập sản phẩm"],
        default: 0
    },
    Stock: {
        type: Number,
        required: [true, "Nhập số lượng sản phẩm"],
        maxLength: [4, 'Số lượng không được vượt quá 4 chữ số'],
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createAt:{
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Bill", billSchema)