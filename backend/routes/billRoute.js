const express = require('express')
const router = express.Router()
const {newBill, deleteBill, updateBill, getAllBills} = require('../controllers/billController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router
    .route("/admin/bills")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllBills);

router.route('/admin/bill/new').post(isAuthenticatedUser, authorizeRoles('admin'),  newBill);
router
    .route('/admin/bill/:id')
        .put(isAuthenticatedUser, authorizeRoles('admin'), updateBill)
        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBill);

module.exports = router;
