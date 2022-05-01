const express = require('express')
const router = express.Router()
const {createBlog, getAllBlogs, updateBlog, deleteBlog, getBlogDetails} = require('../controllers/blogController.js')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/admin/blog/new').post(isAuthenticatedUser, authorizeRoles('admin'),  createBlog);

router.route('/blogs').get(getAllBlogs);
router.route('/blog/:id').get(getBlogDetails);

router.route('/admin/blog/:id')
        .put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog)
        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog)

module.exports = router;
