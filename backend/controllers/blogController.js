const Blog = require('../models/blogModel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors') 
const cloudinary = require('cloudinary')
const ApiFeatures = require('../utils/apifeatures')
const ErrorHander = require('../utils/errorhander')


// create a blog -- admin
exports.createBlog = catchAsyncErrors(async (req, res, next) => {

    let images =[];

    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    const imagesLinks =[];

    for (let i = 0; i < images.length; i++) {
        
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'blogs'
        })

        imagesLinks.push({ 
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id
    
    const blog = await Blog.create(req.body);

    res.status(201).json({
        success: true,
        blog
    })
})

// get all blog -- all user
exports.getAllBlogs = catchAsyncErrors(async (req, res) => {
    const blogs = await Blog.find();

    if(!blogs) {
        return next(new ErrorHander("Không tìm thấy bài viết nào", 404));
    }

    res.status(200).json({
        success: true,
        blogs
    })
})


// get product details -- all user
exports.getBlogDetails = catchAsyncErrors(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        return next(new ErrorHander("Không tìm thấy bài viết nào", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    })
})

// update product -- admin
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {

    let blog = await Blog.findById(req.params.id);

    if(!blog) {
        return next(new ErrorHander("Không tìm thấy bài viết nào", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < blog.images.length; i++) {
        await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "blogs",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        }

    req.body.images = imagesLinks;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        blog
    })
})

// delete -- admin
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        return next(new ErrorHander("Không tìm thấy bài viết nào", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < blog.images.length; i++) {
        await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
    }

    await blog.remove();

    res.status(200).json({
        success: true,
        message: 'Đã xóa bài viết'
    })
})