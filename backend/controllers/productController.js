const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorhander')
const catchAsyncErrors = require('../middleware/catchAsyncErrors') 
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

// create a product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images =[];

    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    const imagesLinks =[];

    for (let i = 0; i < images.length; i++) {
        
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })

        imagesLinks.push({ 
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// get all product -- all user
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8
    const productsCount = await Product.countDocuments()

    const Allproducts = await Product.find();


    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;


    let filteredProductsCount = products.length

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        Allproducts,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})


// get product details -- all user
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Không tìm thấy sản phẩm nào", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })
})

// update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Không tìm thấy sản phẩm nào", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        }

    req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})


// delete -- admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Không tìm thấy sản phẩm nào", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Đã xóa sản phẩm'
    })
})

// create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar.url,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = await product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if(isReviewed) {
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()) 
                (rev.rating = rating),
                (rev.comment = comment)
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })
})

// get all the reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHander('Sản phẩm không tồn tại', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHander('Sản phẩm không tồn tại', 404));
    }

    const reviews = product.reviews.filter( 
        (rev) => rev._id.toString() !== req.query.id.toString())

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        message: 'Đã xóa bình luận'
    })
})

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
    success: true,
    products,
    });
});