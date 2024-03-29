const express = require('express');
const { getAllProducts,
        getProductDetails, 
        createProduct, 
        updateProduct, 
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteReview,
        getAdminProducts
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router
    .route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin", 'Nhân viên kho', 'Nhân viên bán hàng'), getAdminProducts);



router.route('/products').get(getAllProducts);

router.route('/product/:id').get(getProductDetails);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin', 'Nhân viên kho'),  createProduct);

router
    .route('/admin/product/:id')
        .put(isAuthenticatedUser, authorizeRoles('admin','Nhân viên kho'), updateProduct)
        .delete(isAuthenticatedUser, authorizeRoles('admin','Nhân viên kho'), deleteProduct);



router.route('/review').put(isAuthenticatedUser, createProductReview)

router
    .route('/reviews')
        .get(getProductReviews)
        .delete(isAuthenticatedUser, deleteReview)



module.exports = router;