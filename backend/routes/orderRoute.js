const express = require('express')
const router = express.Router()
const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, cancelOrder, myShipping} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder)

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/order/cancel/:id').put(isAuthenticatedUser, cancelOrder)

router.route('/orders/me').get(isAuthenticatedUser, myOrders)

router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'), getAllOrders);
router.route('/shipper/orders').get(isAuthenticatedUser,authorizeRoles('shipper'), myShipping);

router
    .route('/admin/order/:id')
        .put(isAuthenticatedUser, authorizeRoles('admin') , updateOrder)
        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

router.route('/shipper/order/:id').put(isAuthenticatedUser, authorizeRoles('shipper') , updateOrder)
module.exports = router;