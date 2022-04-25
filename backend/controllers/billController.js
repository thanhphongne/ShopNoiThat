const Bill = require('../models/billModel')
const ErrorHander = require('../utils/errorhander')
const catchAsyncErrors = require('../middleware/catchAsyncErrors') 

//create bill
exports.newBill = catchAsyncErrors(async (req, res, next) => {
    const {
        productId,
        price,
        Stock,
        total
    } = req.body

    const bill = await Bill.create({
        productId,
        price,
        Stock,
        total,
        createAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        bill
    })
})

// get all bills -- admin only
exports.getAllBills = catchAsyncErrors( async (req, res, next) => {
    const bills = await Bill.find()

    res.status(200).json({
        success: true,
        bills
    })
})

// update bill status -- admin only
exports.updateBill = catchAsyncErrors( async (req, res, next) => {
    let bill = await Bill.findById(req.params.id)


    if (!bill) {
        return next(new ErrorHander("Hóa đơn không tồn tại", 404));
    }

    bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        bill
    })
})

// delete -- admin
exports.deleteBill = catchAsyncErrors(async (req, res, next) => {

    const bill = await Bill.findById(req.params.id);

    if(!bill) {
        return next(new ErrorHander("Không tìm thấy hóa đơn nào", 404));
    }

    await bill.remove();

    res.status(200).json({
        success: true,
        message: 'Đã xóa hóa đơn'
    })
})