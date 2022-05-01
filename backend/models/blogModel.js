const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Nhập tên bài viết"],
    },
    content: {
        type: String,
        required: [true, "Nhập nội dung bài viết"]
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

module.exports = mongoose.model("Blog", blogSchema)