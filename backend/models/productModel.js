const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nhập tên sản phẩm"],
        trim: true // xóa khoảng trắng thừa
    },
    description: {
        type: String,
        required: [true, "Nhập mô tả sản phẩm"]
    },
    price: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    supplier: {
        type: String,
        required: [true, "Nhập tên nhà thương hiệu"]
    },
    category: {
        type: String,
        required: [true, "Nhập danh mục sản phẩm"]
    },
    Stock: {
        type: Number,
        required: [true, "Nhập số lượng sản phẩm"],
        maxLength: [4, 'Số lượng không được vượt quá 4 chữ số'],
        default: 1
    },
    numOfSale: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String,
                required: true
            },
            avatar:{
                type: String
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

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

module.exports = mongoose.model("Product", productSchema)