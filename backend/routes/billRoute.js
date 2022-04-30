const express = require('express')
const router = express.Router()
const {newBill, deleteBill, updateBill, getAllBills, getBillDetails} = require('../controllers/billController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router
    .route("/admin/bills")
    .get(isAuthenticatedUser, authorizeRoles("admin", 'Nhân viên kho', 'Nhân viên bán hàng'), getAllBills);

router.route('/admin/bill/new').post(isAuthenticatedUser, authorizeRoles('admin', 'Nhân viên kho'),  newBill);
router
    .route('/admin/bill/:id')
        .put(isAuthenticatedUser, authorizeRoles('admin', 'Nhân viên kho'), updateBill)
        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBill)
        .get(isAuthenticatedUser, authorizeRoles('admin', 'Nhân viên kho'),getBillDetails);

module.exports = router;
