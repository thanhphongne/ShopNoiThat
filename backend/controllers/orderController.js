const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const ErrorHander = require('../utils/errorhander')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// create order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    if(shippingInfo.isNew) {
        const user = await User.findByIdAndUpdate(req.user._id, { $push:{shippingInfo: shippingInfo} })
    }

    res.status(201).json({
        success: true,
        order
    })
})

// get single order
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if(!order) {
        return next( new ErrorHander(`Không tìm được đơn hàng với id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        order
    })
})
//cancel order 
exports.cancelOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if (!order) {
        return next(new ErrorHander("Đơn hàng không tồn tại", 404));
    }

    if(order.orderStatus === 'Chờ xác nhận') {
        order.orderStatus = 'Đã hủy'
        order.deliveredAt = Date.now()
    }
    
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true
    })
})
// get history orders
exports.myOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    res.status(200).json({
        success: true,
        orders
    })
})


// get all orders -- admin only
exports.getAllOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update order status -- admin only
exports.updateOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id)


    if (!order) {
        return next(new ErrorHander("Đơn hàng không tồn tại", 404));
    }

    if(order.orderStatus === "Đã nhận hàng"){
        return next( new ErrorHander('Đơn hàng này đã giao xong', 400))
    }

    if(req.body.status === 'Chờ lấy hàng') {
        
        order.shipper = req.body.shipper;
    }
    if(req.body.status === 'Đang giao hàng') {
        order.orderItems.forEach( async (order) => {
            await updateStock(order.product, order.quantity)
        })
    }

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    if(req.body.status === 'Đã nhận hàng'){
        order.deliveredAt = Date.now()
        order.paymentInfo.status = 'succeeded'
        order.paymentInfo.id = 'Paided'
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.Stock -= quantity
    product.numOfSale += quantity

    await product.save({ validateBeforeSave: false })
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Đơn hàng không tồn tại", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true, 
    });
});

// get my shipping orders
exports.myShipping = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find({shipper: req.user._id})
    res.status(200).json({
        success: true,
        orders
    })
})
//choice shipper


